import React from "react";

import { Button, ButtonGroup, HStack } from "@chakra-ui/react";

interface DetailActionProps {
  handleView: () => void;
  handleEdit: () => void;
  handleDelete?: () => void;
}

const DetailActions: React.FC<DetailActionProps> = ({
  handleView,
  handleEdit,
  handleDelete,
}) => {

  return (
    <HStack background={"red"}>
      <ButtonGroup>
        <Button
          aria-label="edit"
          size="sm"
          color={"green"}
          colorScheme="brand"
          variant="solid"
          title={"Edit"}
          onClick={handleView}
        >
          View
        </Button>

        <Button
          aria-label="edit"
          size="sm"
          colorScheme="brand"
          variant="solid"
          title={"Edit"}
          onClick={handleEdit}
        >
          Edit
        </Button>

        <Button
          aria-label="remove"
          size="sm"
          colorScheme="brand"
          variant="solid"
          title={"Edit"}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </ButtonGroup>
    </HStack>
  );
};

export default DetailActions;
