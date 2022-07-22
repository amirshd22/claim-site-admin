import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useFaq, useLogin } from "../stores";
import { useNavigate } from "react-router-dom";
import { createFaq, getFaqs } from "../service";
import FaqTableRow from "../components/FaqTableRow";

const FAQScreen: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const access = useLogin((state) => state.access);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const faqs = useFaq((state) => state.faqs);
  const setFaq = useFaq((state) => state.setFaq);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?redirect=/faqs");
    fetchFaqs();
    // eslint-disable-next-line
  }, [isLoggedIn, navigate]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const data = await getFaqs();
      setLoading(false);
      if (data) {
        setFaq(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createFaq({ question, answer }, access);
      fetchFaqs();
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Screen>
      <Card className="mt-5 mb-1">
        <Card.Header className="bg-white text-center">
          <h3>ساخت سوال و جواب</h3>
        </Card.Header>
        <Card.Body>
          <Form className="w-75 m-auto" onSubmit={create}>
            <Form.Group>
              <Form.Label>سوال:</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestion(e.target.value)
                }
                type="text"
                placeholder="سوال"
                required
                value={question}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>جواب:</Form.Label>
              <Form.Control
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAnswer(e.target.value)
                }
                type="text"
                placeholder="جواب"
                required
                multiple
                value={answer}
              />
            </Form.Group>
            <Button type="submit" variant="outline-dark" className="w-100 mt-2">
              ذخیره
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div>
        <Table striped bordered hover responsive className="rounded">
          <thead>
            <tr>
              <th>سوال</th>
              <th>جواب</th>
              <th>امکانات</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <FaqTableRow key={f.id} faq={f} />
            ))}
          </tbody>
        </Table>
      </div>
    </Screen>
  );
};

export default FAQScreen;
