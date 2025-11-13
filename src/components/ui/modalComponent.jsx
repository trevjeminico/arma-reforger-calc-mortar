import { Dialog, CloseButton, Portal, Button } from "@chakra-ui/react";

export default function ModalComponent({
  DialogBtn = {
    btnVariant: "",
    btnContent: "title",
    btnColor: "",
    dialogRest: {},
  },
  DialogContent = { title: "title", content: "content", disableCancel: false },
}) {
  const { btnVariant, btnContent, btnColor, dialogRest } = DialogBtn;
  const { title, content, disableCancel } = DialogContent;
  return (
    <Dialog.Root placement={"center"} colorPalette={"gray"} {...dialogRest}>
      <Dialog.Trigger asChild>
        <Button
          variant={!!btnVariant ? btnVariant : "outline"}
          size="md"
          colorPalette={!!btnColor ? btnColor : ""}
        >
          {btnContent}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {!!title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body>
              <p>{content}</p>
            </Dialog.Body>
            <Dialog.Footer>
              {!!disableCancel && (
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              )}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
