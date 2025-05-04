import React from "react";
import { Dialog, CloseButton, Portal, Blockquote } from "@chakra-ui/react";
export default function ModalUpdates() {
  return (
    <Dialog.Root defaultOpen size="md">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Upcomming updates</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Blockquote.Root>
                <Blockquote.Content>
                  Will be adding documentation soon and will also try to update
                  some of the UX/UI for user experience cause as i have limited
                  time due to work load please wait patiently.
                </Blockquote.Content>
              </Blockquote.Root>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
