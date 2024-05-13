import { AirbnbRatingDefault } from "@rneui/themed/dist/AirbnbRating";
import { Text } from '@rneui/themed';

export default function Rating({ setRate, text, score }) {

  const finalRate = (rating) => {
    setRate(rating);
  }

  return (
    <>
      <Text h4>{text}</Text>
      <AirbnbRatingDefault
        count={6}
        showRating={false}
        onFinishRating={finalRate}
        size={30}
        defaultRating={score}
      />
    </>
  )
}