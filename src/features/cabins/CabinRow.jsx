import { useState } from "react";
import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

const TempBtn = styled.button`
  border: none;
  background-color: var(--color-brand-600);
  padding: 1rem;
  border-radius: 9999px;
  font-size: 1.4rem;
  text-align: center;
  color: var(--color-grey-50);

  &:hover {
    background-color: var(--color-brand-700);
  }

  &:active,
  &:focus {
    border: none;
    outline: none;
  }
`;

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <BtnContainer>
          <TempBtn disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </TempBtn>
          <TempBtn onClick={() => setShowForm((s) => !s)}>
            <HiPencil />
          </TempBtn>
          <TempBtn disabled={isDeleting} onClick={() => deleteCabin(cabinId)}>
            <HiTrash />
          </TempBtn>
        </BtnContainer>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToUpdate={cabin} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default CabinRow;
