import TableHeading from "../common/TableHeading";
import { leftCharges, rightCharges } from "./ChargesData";

export default function Charges() {
  return (
    <>
      <div>
        <TableHeading heading="Charges Explained" />
        <div className="flex flex-col md:flex-row justify-between md:gap-8 gap-4">
          <ChargeArray array={leftCharges} />
          <ChargeArray array={rightCharges} />
        </div>
        <div>
          <h4 className="text-lg mt-8 mb-4">Disclaimer</h4>
          <p className="text-gray-500">
            TradeX is a portfolio project created for demonstration and
            educational purposes. Pricing shown on this page represents the
            pricing model implemented for the project and may not reflect the
            actual charges of any real-world broker or exchange. Statutory and
            regulatory charges are not simulated unless explicitly stated.
          </p>
        </div>
      </div>
    </>
  );
}

type ChargesArray = {
  title: string;
  description: string[];
};
function ChargeArray({ array }: { array: ChargesArray[] }) {
  return (
    <div className="flex flex-col gap-4 md:max-w-md lg:max-w-lg xl:max-w-xl">
      {array.map((charge) => (
        <div key={charge.title}>
          <h3 className="font-bold mb-4">{charge.title}</h3>
          <p>
            {charge.description.map((line, index) => (
              <div key={index} className="mb-4 text-gray-500 text-xs ">
                {line}
              </div>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
