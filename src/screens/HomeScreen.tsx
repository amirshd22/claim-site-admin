import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import { useLogin } from "../stores";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAllUsers, getGlobalInfo, updateGlobalInfo } from "../service";
import NumberFormat from "react-number-format";

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalWithdrawals, setTotalWithdrawals] = useState<string>("");
  const [totalCount, setTotalCount] = useState<string>("");
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const access = useLogin((state) => state.access);
  const userCount = useLogin((state) => state.userCount);
  const setUserCount = useLogin((state) => state.setUserCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
    fetchUsers();
    fetchGlobalInfo();
    // eslint-disable-next-line
  }, [navigate, isLoggedIn]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(access);
      setUserCount(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGlobalInfo = async () => {
    try {
      const data = await getGlobalInfo();
      setTotalWithdrawals(data.total_withdrawals);
      setTotalCount(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateGlobalInfo(access, {
        users: totalCount,
        total_withdrawals: totalWithdrawals,
      });
      fetchGlobalInfo();
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <>Loading</>
  ) : (
    <Screen>
      <Card className="mt-5 w-75 m-auto">
        <Card.Header></Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-around">
              <div>تعداد کل کاربران</div>
              <div>
                <NumberFormat
                  value={userCount}
                  thousandSeparator
                  displayType="text"
                />
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card className="mt-2 w-75 m-auto">
        <Card.Header className="text-center">اطلاعات کلی سایت</Card.Header>
        <Form onSubmit={handleSubmit}>
          <Card.Body>
            <ListGroup>
              <Form.Group>
                <ListGroup.Item>
                  <Form.Label>کل کاربران:</Form.Label>
                  <Form.Control
                    value={totalCount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTotalCount(e.target.value)
                    }
                  />
                </ListGroup.Item>
              </Form.Group>
              <Form.Group>
                <ListGroup.Item>
                  <Form.Label>پرداختی ها:</Form.Label>

                  <Form.Control
                    value={totalWithdrawals}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTotalWithdrawals(e.target.value)
                    }
                  />
                </ListGroup.Item>
              </Form.Group>
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button type="submit">بروزرسانی</Button>
          </Card.Footer>
        </Form>
      </Card>
    </Screen>
  );
};

export default HomeScreen;
