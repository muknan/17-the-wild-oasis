import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();

  useEffect(
    function () {
      setConfirmPayment(booking?.isPaid || false);
    },
    [booking]
  );
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPayment) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={hasBreakfast || addBreakfast}
            disabled={hasBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPayment(false);
            }}
          >
            Want to add breakfast for{" "}
            <span style={{ color: "darkgreen", fontWeight: "600" }}>
              {formatCurrency(optionalBreakfastPrice)}
            </span>
            ?
          </Checkbox>
        </Box>
      )}

      {
        <Box>
          <Checkbox
            checked={confirmPayment}
            disabled={confirmPayment || isCheckingIn}
            onChange={() => setConfirmPayment((confirm) => !confirm)}
            id="confirm"
          >
            I confirm that {guests.fullName} has paid total amount{" "}
            <span style={{ color: "darkgreen", fontWeight: "600" }}>
              {!addBreakfast
                ? formatCurrency(totalPrice)
                : `${formatCurrency(
                    totalPrice + optionalBreakfastPrice
                  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                    optionalBreakfastPrice
                  )})`}
            </span>
          </Checkbox>
        </Box>
      }

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingIn}
        >
          {addBreakfast && booking.isPaid ? (
            <span>Add breakfast to booking #{bookingId}</span>
          ) : (
            <span>Check in booking #{bookingId}</span>
          )}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
