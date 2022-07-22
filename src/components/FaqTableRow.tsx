import React, { useState } from "react";
import { FaQ, useLogin } from "../stores";
import Button from "react-bootstrap/Button";
import { deleteFaq, updateFaq } from "../service";

interface Props {
  faq: FaQ;
}

const FaqTableRow: React.FC<Props> = ({ faq }) => {
  const [question, setQuestion] = useState<string>(faq.question);
  const [answer, setAnswer] = useState<string>(faq.answer);
  const access = useLogin((state) => state.access);
  const deleteFaqHandler = async () => {
    try {
      await deleteFaq(faq.id, access);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const updateFaqHandler = async () => {
    try {
      await updateFaq({ question, answer }, faq.id, access);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr key={faq.id}>
      <th>
        <input
          value={question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
          className="w-100"
        />
      </th>
      <th>
        <input
          value={answer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAnswer(e.target.value)
          }
          className="w-100"
        />
      </th>
      <th>
        <Button variant="danger" onClick={deleteFaqHandler} className="w-50">
          D
        </Button>
        <Button variant="success" onClick={updateFaqHandler} className="w-50">
          E
        </Button>
      </th>
    </tr>
  );
};

export default FaqTableRow;
