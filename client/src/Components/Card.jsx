import classNames from "classnames";

const Card = ({ icon, heading, tittle, textColor, bgColor }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={classNames(
          "border p-4 rounded-full",
          textColor, // Already a valid Tailwind class
          bgColor // Already a valid Tailwind class
        )}
      >
        {icon}
      </div>

      <h2 className="font-bold text-xl">{heading}</h2>
      <p className="text-center">{tittle}</p>
    </div>
  );
};

export default Card;
