import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { getMessages } from "../service/messages.service";
import { useLogin, useMessage } from "../stores";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getPageNumber } from "../utils/getPageNumber";

const MessagesScreen: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const [loading, setLoading] = useState<boolean>(false);
  const access = useLogin((state) => state.access);
  const navigate = useNavigate();
  const messages = useMessage((state) => state.messages);
  const setMessages = useMessage((state) => state.setMessages);
  const setNext = useMessage((state) => state.setNext);
  const setPrev = useMessage((state) => state.setPrev);
  const prev = useMessage((state) => state.prev);
  const next = useMessage((state) => state.next);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?redirect=/messages");
    fetchMessages("page=1");
    // eslint-disable-next-line
  }, [isLoggedIn, navigate]);

  const fetchMessages = async (page: string) => {
    try {
      setLoading(true);
      const data = await getMessages(access, page);
      setLoading(false);
      if (data) {
        setMessages(data.results);
        setNext(data.next ? getPageNumber(data.next) : "page=1");
        setPrev(data.previous ? getPageNumber(data.previous) : "page=1");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <Screen>
      <div className="mt-5">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ایمیل</th>
              <th>اسم</th>
              <th>متن</th>
              <th>شماره تلفن</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <th>{m.email}</th>
                <th>{m.name}</th>
                <th>{m.text}</th>
                <th>{m.phone}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-around">
        <Button onClick={() => fetchMessages(next)} variant="outline-dark">
          صفحه بعد
        </Button>
        <Button onClick={() => fetchMessages(prev)} variant="outline-dark">
          صفحه قبل
        </Button>
      </div>
    </Screen>
  );
};

export default MessagesScreen;
