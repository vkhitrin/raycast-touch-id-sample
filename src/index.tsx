import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import {canAuthenticate, authenticate} from "macos-touchid";

type Values = {
  textfield: string;
  textarea: string;
  datepicker: Date;
  checkbox: boolean;
  dropdown: string;
  tokeneditor: string[];
};

export default function Command() {

  function failedAuthentication() {
    console.log("failed to authenticate, terminating")
    showToast({ title: "Authentication Failed :(", message: "Please try again", style: Toast.Style.Failure});
  }

  function successfulAuthentication() {
    console.log("authenticated, proceeding")
    showToast({ title: "Authentication Succeeded", message: ":)", style: Toast.Style.Success });
  }

  function handleSubmit(values: Values) {
  if (canAuthenticate() === false) {
    throw new Error('No authentication method available')
  }

  authenticate('authenticate you through Raycast', function (err: any) {
    err ? failedAuthentication() : successfulAuthentication()
  })
    console.log(values);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="This form showcases all available form elements." />
      <Form.TextField id="textfield" title="Text field" placeholder="Enter text" defaultValue="Raycast" />
      <Form.TextArea id="textarea" title="Text area" placeholder="Enter multi-line text" />
      <Form.Separator />
      <Form.DatePicker id="datepicker" title="Date picker" />
      <Form.Checkbox id="checkbox" title="Checkbox" label="Checkbox Label" storeValue />
      <Form.Dropdown id="dropdown" title="Dropdown">
        <Form.Dropdown.Item value="dropdown-item" title="Dropdown Item" />
      </Form.Dropdown>
      <Form.TagPicker id="tokeneditor" title="Tag picker">
        <Form.TagPicker.Item value="tagpicker-item" title="Tag Picker Item" />
      </Form.TagPicker>
    </Form>
  );
}
