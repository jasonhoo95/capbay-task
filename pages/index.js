import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [state, setState] = useState({
    data: [
      { id: "B001", total: 1, priceTotal: 2.5 },
      { id: "F001", total: 1, priceTotal: 1.5 },
      { id: "B002", total: 1, priceTotal: 2 },
    ],
  });
  const [input, setInput] = useState();
  let mainData = [];
  useEffect(() => {}, [state]);
  const calculateDrinks = (val, key) => {
    const oddCheck = val % 2 == 0 ? false : true;
    let totalVal;
    const drinkObject = { B001: 2.5, B002: 2 };
    if (oddCheck) {
      totalVal = (val - 1) / 2 + 1;
      mainData.push({
        id: key,
        total: val,
        priceTotal: totalVal * drinkObject[key],
      });
    } else {
      totalVal = val / 2;
      mainData.push({
        id: key,
        total: val,
        priceTotal: totalVal * drinkObject[key],
      });
    }

    setState({ data: mainData });
  };

  const calculateFood = (val, key) => {
    let totalVal;

    if (val >= 2) {
      totalVal = val * 1.2;
      mainData.push({ id: key, total: val, priceTotal: totalVal });
    } else {
      totalVal = val * 1.5;
      mainData.push({ id: key, total: val, priceTotal: totalVal });
    }
    setState({ data: mainData });
  };
  const calculateArray = (orderList) => {
    const arrayObject = orderList;
    const count = {};
    arrayObject.forEach((element) => {
      count[element] = (count[element] || 0) + 1;
    });
    let entries = Object.entries(count);
    let data = entries.map(([key, val] = entry) => {
      if (key == "B001" || key == "B002") {
        calculateDrinks(val, key);
      } else {
        calculateFood(val, key);
      }
    });
  };

  const submitOrder = () => {
    const orderList = input.split(",");
    calculateArray(orderList);
  };

  const renderProductType = (type) => {
    switch (type) {
      case "B001":
        // code block
        return "Kopi";
      case "B002":
        // code block
        return "Teh Tarik";

      case "F001":
        return "Roti Kosong";

      // code block
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h2>Menu Items</h2>
        <div style={{ paddingBottom: "10px" }}>1. B001(Kopi): RM2.5</div>
        <div style={{ paddingBottom: "10px" }}>2. B002(Teh Tarik): RM2</div>
        <div style={{ paddingBottom: "10px" }}>3. F001(Roti Kosong): RM1.5</div>
      </div>
      <div
        style={{ display: "flex", margin: "10px 0px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="B001,F001,F001"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          className="button-4"
          style={{ marginLeft: "20px" }}
          onClick={(e) => submitOrder()}>
          Submit
        </button>
        <div style={{ fontWeight: "bold" }}>
          (Submit value (B001,F001,F002) like this format, in an array)
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Item</th>
            <th>Total Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((o, key) => {
            return (
              <tr key={key}>
                <td>
                  {renderProductType(o.id)}
                  <span style={{ fontWeight: "bold" }}>({o.id})</span>
                </td>
                <td>{o.total}</td>
                <td>RM {o.priceTotal}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td>
              Total Quantity:{" "}
              {state.data.reduce((n, { total }) => n + total, 0)}
            </td>
            <td>
              Total Price: RM{" "}
              {state.data.reduce((n, { priceTotal }) => n + priceTotal, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
