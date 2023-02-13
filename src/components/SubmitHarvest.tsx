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
} from "reshaped";
import { supabase } from "../lib/supabaseClient";
import { uuid } from "uuidv4";

interface SubmitHarvestProps {
  user: User;
}

const SubmitHarvest = ({ user }: SubmitHarvestProps) => {
  const { active, activate, deactivate } = useToggle(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const image = formData.get("image") as File;
    console.log(image.name, user);

    const upload = await supabase.storage
      .from("harvests")
      .upload(uuid(), image);

    if (upload.data) {
      const harvest = await supabase.from("harvests").insert({
        claimant: 1,
        user: user.id,
        location: formData.get("location") as string,
        image: upload.data.path,
        is_synthetic: formData.get("is_synthetic") === "true",
      });

      console.log(harvest);
    }
  };
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
          <form onSubmit={onSubmit}>
            <View gap={3}>
              <FormControl required>
                <FormControl.Label>Image</FormControl.Label>
                <TextField
                  name="image"
                  onChange={(args) => console.log(args)}
                  inputAttributes={{ type: "file" }}
                />
              </FormControl>
              <FormControl required>
                <FormControl.Label>Location</FormControl.Label>
                <TextField
                  name="location"
                  placeholder="Enter a street and suburb"
                  onChange={(args) => console.log(args)}
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
              <Button type="submit">Submit</Button>
            </View>
          </form>
        </View>
      </Modal>
    </>
  );
};

export default SubmitHarvest;
