import type { User } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  Dismissible,
  Modal,
  useToggle,
  View,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  useToast,
  Alert,
} from "reshaped";
import { supabase } from "../lib/supabaseClient";
import { uuid } from "uuidv4";
import { useData } from "../pages";
import useSWRMutation from "swr/mutation";
import type { Database } from "../types/supabase";

interface SubmitHarvestProps {
  user: User;
}

interface UploadImageArgs {
  arg: File;
}

async function uploadImage(key: string, { arg: image }: UploadImageArgs) {
  const { data, error } = await supabase.storage
    .from("harvests")
    .upload(uuid(), image);

  if (error) {
    throw new Error("Image upload issue");
  }

  return data;
}

async function insertHarvest(
  key: string,
  { arg }: { arg: Database["public"]["Tables"]["harvests"]["Insert"] }
) {
  const { data, error } = await supabase.from("harvests").insert(arg);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

const SubmitHarvest = ({ user }: SubmitHarvestProps) => {
  const { active, activate, deactivate } = useToggle(false);
  const { mutate: refetch } = useData();
  const upload = useSWRMutation("upload", uploadImage);
  const insert = useSWRMutation("insert", insertHarvest);
  const toast = useToast();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const image = formData.get("image") as File;

    try {
      const imageData = await upload.trigger(image);
      if (imageData) {
        await insert.trigger({
          claimant: 1,
          user: user.id,
          location: formData.get("location") as string,
          image: imageData.path,
          is_synthetic: formData.get("is_synthetic") === "true",
        });

        await refetch();
        toast.show({
          text: "Harvest submitted!",
          position: "top",
        });
        deactivate();
      }
    } catch (err) {
      toast.show({
        text: "There was an issue submitting your harvest",
        position: "top",
      });
    }
  };

  let error: boolean | Error = false;
  if (upload.error instanceof Error) {
    error = upload.error;
  }
  if (insert.error instanceof Error) {
    error = insert.error;
  }

  return (
    <>
      <Button size="small" variant="outline" onClick={activate}>
        Submit
      </Button>
      <Modal
        active={active}
        onClose={deactivate}
        position={{ s: "bottom", m: "center" }}
      >
        <View gap={2}>
          <Dismissible onClose={deactivate} closeAriaLabel="Close modal">
            <Modal.Title>Submit harvest</Modal.Title>
          </Dismissible>
          {error && (
            <Alert title="Something went wrong" color="critical">
              We couldn’t upload your harvest, here’s what went wrong:{" "}
              <strong>{error.message}</strong>
            </Alert>
          )}
          <form onSubmit={(event) => void onSubmit(event)}>
            <View gap={3}>
              <FormControl required>
                <FormControl.Label>Image</FormControl.Label>
                <TextField name="image" inputAttributes={{ type: "file" }} />
              </FormControl>
              <FormControl required>
                <FormControl.Label>Location</FormControl.Label>
                <TextField
                  name="location"
                  placeholder="Enter a street and suburb"
                />
              </FormControl>
              <FormControl group required>
                <RadioGroup name="is_synthetic">
                  <View gap={2}>
                    <Radio value="false">This tree is natural</Radio>
                    <Radio value="true">This tree is synthetic</Radio>
                  </View>
                </RadioGroup>
              </FormControl>
              <Button
                loading={upload.isMutating}
                disabled={upload.isMutating}
                type="submit"
              >
                Submit
              </Button>
            </View>
          </form>
        </View>
      </Modal>
    </>
  );
};

export default SubmitHarvest;
