import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirm = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmOperation({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  operation,
}) {
  return (
    <StyledConfirm>
      <Heading as="h3">
        {operation.at(0).toUpperCase() + operation.slice(1)} {resourceName}
      </Heading>
      {operation === "delete" && (
        <>
          <p>
            Are you sure you want to {operation} {resourceName} permanently?
          </p>
          <p style={{ color: "var(--color-red-700)", fontWeight: "bold" }}>
            This action cannot be undone!
          </p>
        </>
      )}
      {operation === "duplicate" && (
        <p>
          Are you sure you want to {operation} {resourceName}? This action will
          create a new record!
        </p>
      )}

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={() => {
            onCloseModal();
            onConfirm();
          }}
        >
          {operation.at(0).toUpperCase() + operation.slice(1)}
        </Button>
      </div>
    </StyledConfirm>
  );
}

export default ConfirmOperation;
