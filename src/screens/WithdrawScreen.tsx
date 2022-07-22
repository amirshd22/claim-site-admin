import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { getWithdraws } from "../service";
import { useLogin, useWithdraw } from "../stores";
import { getPageNumber } from "../utils/getPageNumber";
import Table from "react-bootstrap/Table";
import NumberFormat from "react-number-format";
import Button from "react-bootstrap/Button";
const WithdrawScreen: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const access = useLogin((state) => state.access);
  const navigate = useNavigate();

  const [sorting, setSorting] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const withdraws = useWithdraw((state) => state.withdraws);
  const next = useWithdraw((state) => state.next);
  const prev = useWithdraw((state) => state.prev);
  const last = useWithdraw((state) => state.last);

  const setWithdraws = useWithdraw((state) => state.setWithdraws);
  const setNext = useWithdraw((state) => state.setNext);
  const setPrev = useWithdraw((state) => state.setPrev);
  const setLast = useWithdraw((state) => state.setLast);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?redirect=/withdrawals");
    fetchWithdraws("-createdAt", "page=1");
    // eslint-disable-next-line
  }, [isLoggedIn, navigate]);

  const fetchWithdraws = async (sort: string, page: string) => {
    try {
      setLoading(true);
      setSorting(sort);
      const data = await getWithdraws(access, sort, page);
      setLoading(false);
      if (data) {
        setWithdraws(data.results);
        setNext(getPageNumber(data.next ? getPageNumber(data.next) : ""));
        setPrev(data.previous ? getPageNumber(data.previous) : "");
        setLast(`page=${Math.round(data.count / 50)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const copyWallet = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const payThis = () => {};

  return loading ? (
    <>Loading...</>
  ) : (
    <Screen>
      <div className="d-flex mt-5">
        <Button onClick={() => fetchWithdraws("createdAt", "page=1")}>
          قدیم به جدید
        </Button>
        <Button onClick={() => fetchWithdraws("-createdAt", "page=1")}>
          جدید به قدیم
        </Button>
      </div>
      <Table striped bordered hover className="mt-1" responsive>
        <thead>
          <tr>
            <th>ای دی تلگرام</th>
            <th>کل موجودی</th>
            <th> مبلغ برداشتی</th>
            <th>فعالیت ها</th>
          </tr>
        </thead>
        <tbody>
          {withdraws.map((w) => (
            <tr>
              <th>{w.profile.telegram_id}</th>
              <th>
                <NumberFormat
                  value={
                    w.profile.claim_point +
                    w.profile.subset_point -
                    w.profile.total_withdraw
                  }
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />
              </th>
              <th>
                <NumberFormat
                  value={w.profile.last_withdraw}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />
              </th>
              <th className="d-flex flex-column flex-md-row justify-content-around">
                <Button
                  size="sm"
                  variant="outline-dark w-100"
                  onClick={() => copyWallet(w.profile.wallet_address)}
                >
                  کپی آدرس
                </Button>
                <Button
                  size="sm"
                  variant="outline-dark w-100"
                  onClick={payThis}
                >
                  پرداخت
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-around">
        <Button
          variant="outline-dark"
          onClick={() => fetchWithdraws(sorting, "page=1")}
          size="sm"
        >
          صحفه اول
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => fetchWithdraws(sorting, next)}
          size="sm"
        >
          بعدی
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => fetchWithdraws(sorting, prev)}
          size="sm"
        >
          قبلی
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => fetchWithdraws(sorting, last)}
          size="sm"
        >
          صحفه آخر
        </Button>
      </div>
    </Screen>
  );
};

export default WithdrawScreen;
