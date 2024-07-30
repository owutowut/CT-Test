"use client";

import React, { useEffect, useState } from "react";
import sampleData from "@/constant/sampleData";

export default function Home() {
  //สร้าง state เพื่อเก็บ input และแสดงผล output
  const [inputTest1, setInputTest1] = useState({
    orderDate: "2024-07-29",
    status: "Processing",
  });
  const [outputTest1, setOutputTest1] = useState([]);

  //ฟังก์ชัน get_orders_by_date รับ input orderDate และ status เพื่อแสดงผลข้อมูล ตาม inupt ที่ได้รับ
  const get_orders_by_date = (orderDate, status) => {
    //เช็คว่ามี input orderDate มั้ย ถ้าไม่มีให้ filter แค่ status แทน
    if (orderDate) {
      return (
        sampleData.orders
          .filter((order) => {
            //filter ข้อมูล โดยแปลงค่า orderDate ที่ได้จาก sampleData เป็นรูปแบบ YYYY-MM-DD
            const dataOrderDate = new Date(order.orderDate);
            const year = dataOrderDate.getFullYear();
            const month = String(dataOrderDate.getMonth() + 1).padStart(2, "0");
            const day = String(dataOrderDate.getDate()).padStart(2, "0");
            const newDataOrderDate = `${year}-${month}-${day}`;
            //แสดงผลข้อมูลที่มี newDataOrderDate ตรงกับ input orderDate
            //ถ้ามี input status ด้วยให้เพิ่ม filter ข้อมูลที่มี status ตรงกับ input status ด้วย
            if (status !== "None" && status !== "") {
              return (
                newDataOrderDate === orderDate.trim() &&
                order.status === status.trim()
              );
            } else {
              return newDataOrderDate === orderDate.trim();
            }
          })
          //แสดงผลรวมข้อมูลทั้งหมดทีไ่ด้จาก filter โดยเพิ่มค่า totalValue คือค่าผลรวมของ price คูณด้วย quantity
          .map((order) => ({
            ...order,
            totalValue: order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
          }))
      );
    } else {
      //เช็ค input status ถ้ามีให้้เพิ่ม filter ข้อมูลที่มี status ตรงกับ input status
      if (status !== "None" && status !== "") {
        return (
          sampleData.orders
            .filter((order) => order.status === status.trim())
            //แสดงผลรวมข้อมูลทั้งหมดทีไ่ด้จาก filter โดยเพิ่มค่า totalValue คือค่าผลรวมของ price คูณด้วย quantity
            .map((order) => ({
              ...order,
              totalValue: order.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ),
            }))
        );
      } else {
        //แสดงผลรวมข้อมูลทั้งหมดทีไ่ด้จาก filter โดยเพิ่มค่า totalValue คือค่าผลรวมของ price คูณด้วย quantity
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

  //ถ้ามีการเปลี่ยนค่าใน inputTest1 ให้ใช้ฟังก์ชัน get_orders_by_date และเซ็ตค่าลงใน outputTest1
  useEffect(() => {
    if (sampleData) {
      const result = get_orders_by_date(
        inputTest1.orderDate,
        inputTest1.status
      );
      setOutputTest1(result);
    }
  }, [inputTest1]);

  //สร้าง state เพื่อเก็บ input และแสดงผล output
  const [inputTest2, setInputTest2] = useState(0);
  const [outputTest2, setOutputTest2] = useState(0);

  //แสดงโจทย์ Fibonacci Number
  const test2 = "F(0) = 0, F(1) = 1 F(n) = F(n - 1) + F(n - 2), for n > 1.";

  //ฟังชัน f(n) รับค่า n โดยถ้า n น้อยกว่าหรือเท่ากับ 1 ให้คืนค่า n ถ้ามากกว่า 1 ให้ใช้ฟังก์ชันคำนวณ f(n - 1) + f(n - 2)
  const f = (n) => {
    if (n <= 1) {
      return n;
    } else {
      return f(n - 1) + f(n - 2);
    }
  };

  //ถ้ามีการเปลี่ยนค่าใน inputTest2 ให้ใช้ฟังก์ชัน f(n) โดยค่า inputTest2 ต้องมากกว่าหรือเท่า 0 และ น้อยกว่าหรือเท่ากับ 30
  useEffect(() => {
    if (0 <= inputTest2 && inputTest2 <= 30 && inputTest2 !== "") {
      const result = f(inputTest2);
      setOutputTest2(result);
    } else {
      setOutputTest2(
        "input ต้องมีค่ามากกว่าหรือเท่ากับ 0 และ น้อยกว่าหรือเท่ากับ 30"
      );
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
            {/* ถ้า outputTest1 มีข้อมูลมากกว่า 0 ให้แสดงผลเป็นตาราง */}
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
                  {/* แสดงข้อมูลทั้งหใดใน outputTest1 โดยใช้ orderId เป็น key */}
                  {outputTest1.map((order) => (
                    <tr key={order.orderId}>
                      <td className="border p-4">{order.orderId}</td>
                      <td className="border p-4">{order.customerId}</td>
                      <td className="border p-4">{order.orderDate}</td>
                      <td className="border p-4">{order.status}</td>
                      {/* แปลง totalValue เป็นทศนิยม 2 ตำแหน่ง */}
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
