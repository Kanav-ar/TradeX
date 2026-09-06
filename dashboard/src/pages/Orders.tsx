import { useEffect } from "react";
import { Link } from "react-router";
import { useOrderStore } from "../store/orders.store";
import { getOrders } from "../api/order.api";

export default function Orders() {
  const allOrders = useOrderStore((state) => state.allOrders);
  const setOrders = useOrderStore((state) => state.setAllOrders);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchAllOrders();
  }, [setOrders]);

  return (
    <div className="px-4 py-2">
      {allOrders.length === 0 ? (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <p className="mb-6 max-w-md text-lg font-light text-gray-500 dark:text-gray-400">
            You haven't placed any orders today
          </p>

          <Link
            to="/"
            className="rounded-sm bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-500"
          >
            Get started
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="pb-4 text-gray-600 text-xl dark:text-gray-200">
            Orders ({allOrders.length})
          </div>
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-y border-gray-200 dark:border-gray-700">
                <th className="px-4 py-4 text-left text-sm font-light text-gray-400 dark:text-gray-500">
                  Stock Name
                </th>

                <th className="px-4 py-4 text-right text-sm font-light text-gray-400 dark:text-gray-500">
                  Quantity
                </th>

                <th className="px-4 py-4 text-right text-sm font-light text-gray-400 dark:text-gray-500">
                  Price
                </th>

                <th className="px-4 py-4 text-right text-sm font-light text-gray-400 dark:text-gray-500">
                  Side
                </th>

                <th className="px-4 py-4 text-right text-sm font-light text-gray-400 dark:text-gray-500">
                  Product
                </th>

                <th className="px-4 py-4 text-right text-sm font-light text-gray-400 dark:text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-800 dark:text-gray-300">
              {allOrders.map((order) => {
                const isBuy = order.side === "BUY";

                return (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-4 py-4 text-left">{order.name}</td>

                    <td className="px-4 py-4 text-right">{order.qty}</td>

                    <td className="px-4 py-4 text-right">
                      ₹{order.price.toFixed(2)}
                    </td>

                    <td
                      className={`px-4 py-4 text-right font-medium ${
                        isBuy
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-orange-600 dark:text-orange-400"
                      }`}
                    >
                      {order.side}
                    </td>

                    <td className="px-4 py-4 text-right">{order.product}</td>

                    <td className="px-4 py-4 text-right">{order.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
