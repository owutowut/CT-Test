"use client";

import React, { useEffect, useState } from "react";
import sampleData from "@/constant/sampleData";

export default function Home() {
  const [inputTest1, setInputTest1] = useState({
    orderDate: "2024-07-29",
    status: "Processing",
  });
  const [outputTest1, setOutputTest1] = useState([]);

  const get_orders_by_date = (orderDate, status) => {
    if (orderDate) {
      return sampleData.orders
        .filter((order) => {
          const dataOrderDate = new Date(order.orderDate);
          const year = dataOrderDate.getFullYear();
          const month = String(dataOrderDate.getMonth() + 1).padStart(2, "0");
          const day = String(dataOrderDate.getDate()).padStart(2, "0");
          const newDataOrderDate = `${year}-${month}-${day}`;
          if (status !== "None" && status !== "") {
            return (
              newDataOrderDate === orderDate.trim() &&
              order.status === status.trim()
            );
          } else {
            return newDataOrderDate === orderDate.trim();
          }
        })
        .map((order) => ({
          ...order,
          totalValue: order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        }));
    } else {
      if (status !== "None" && status !== "") {
        return sampleData.orders
          .filter((order) => order.status === status.trim())
          .map((order) => ({
            ...order,
            totalValue: order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          }));
      } else {
        return sampleData.orders.map((order) => ({
          ...order,
          totalValue: order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        }));
      }
    }
  };

  useEffect(() => {
    if (sampleData) {
      const result = get_orders_by_date(
        inputTest1.orderDate,
        inputTest1.status
      );
      setOutputTest1(result);
    }
  }, [inputTest1]);

  const [inputTest2, setInputTest2] = useState(0);
  const [outputTest2, setOutputTest2] = useState(0);

  const test2 = "F(0) = 0, F(1) = 1 F(n) = F(n - 1) + F(n - 2), for n > 1.";

  const f = (n) => {
    if (n <= 1) {
      return n;
    } else {
      return f(n - 1) + f(n - 2);
    }
  };

  useEffect(() => {
    if (0 <= inputTest2 <= 30) {
      const result = f(inputTest2);
      setOutputTest2(result);
    }
  }, [inputTest2]);

  return (
    <div className="bg-slate-800 flex justify-center items-center h-full min-h-screen w-full p-[4rem]">
      <div className="h-full w-full space-y-[2rem]">
        <div className="p-[4rem] space-y-[2rem] bg-black rounded-lg overflow-auto">
          <h2>Test1</h2>
          <div className="space-y-[1rem]">
            <div className="flex space-x-[1rem]">
              <p>orderDate : </p>
              <input
                className="text-black py-1 px-2 rounded-md"
                type="string"
                value={inputTest1.orderDate}
                onChange={(e) => {
                  setInputTest1((prevState) => ({
                    ...prevState,
                    orderDate: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex space-x-[1rem]">
              <p>status : </p>
              <input
                className="text-black py-1 px-2 rounded-md"
                type="string"
                value={inputTest1.status}
                onChange={(e) => {
                  setInputTest1((prevState) => ({
                    ...prevState,
                    status: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="space-y-[1rem]">
            <p>orderDate : {inputTest1.orderDate}</p>
            <p>status : {inputTest1.status}</p>
            {outputTest1.length > 0 && (
              <table className="text-white border">
                <thead>
                  <tr>
                    <th className="border p-4">Order ID</th>
                    <th className="border p-4">Customer ID</th>
                    <th className="border p-4">Order Date</th>
                    <th className="border p-4">Status</th>
                    <th className="border p-4">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {outputTest1.map((order) => (
                    <tr key={order.orderId}>
                      <td className="border p-4">{order.orderId}</td>
                      <td className="border p-4">{order.customerId}</td>
                      <td className="border p-4">{order.orderDate}</td>
                      <td className="border p-4">{order.status}</td>
                      <td className="border p-4">
                        ${order.totalValue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="p-[4rem] space-y-[2rem] bg-black rounded-lg overflow-auto">
          <h2>Test2</h2>
          <p>{test2}</p>
          <div className="flex space-x-[1rem]">
            <p>input : </p>
            <input
              className="text-black py-1 px-2 rounded-md"
              type="number"
              value={inputTest2}
              onChange={(e) => {
                setInputTest2(e.target.value);
              }}
            />
          </div>
          <div>
            <p>input : {inputTest2}</p>
            <p>output : {outputTest2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
