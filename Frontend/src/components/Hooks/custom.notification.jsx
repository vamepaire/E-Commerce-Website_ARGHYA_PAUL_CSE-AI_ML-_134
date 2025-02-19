import React from "react";
import { Alert } from "@heroui/alert";

export function Notification({
  title = "",
  message = "",
  color = "",
  variant = "faded",
}) {
  const [isVisible, setIsVisible] = React.useState(true);

  // const title = props.title;
  // const message = props.message;
  // const color = props.color;

  return (
    <div className="flex flex-col ">
      {isVisible ? (
        <Alert
          color={color}
          description={message}
          isVisible={isVisible}
          title={title}
          variant={variant}
          onClose={() => setIsVisible(false)}
        />
      ) : null}
    </div>
  );
}


