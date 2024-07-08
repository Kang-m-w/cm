import React from "react";

type Props = {
  desc: string;
};

export const CarouselItem = (props: { item: Props }) => {
  return (
    <div className="embla__slide">
      <div className="embla_item" style={{
        backgroundImage: `url('${props.item.desc}')`
      }} />
    </div>
  );
};
