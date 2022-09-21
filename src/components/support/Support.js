import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/Loader";
import { Navigate } from "react-router-dom";
import { notifyInfo } from "../../services/notifications";
import socket from "../../services/messages";
import { validate } from "../../store/actions/auth.action";

const Support = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const lastMessage = useRef(null);
  useEffect(() => {
    dispatch(validate());
    if (user.validated === true) {
      socket.emit("user", user);
      setLoading(false);
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, []);
  useEffect(() => {
    socket.on("messages", (data) => {
      setMessages(data);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const submit = (e) => {
    e.preventDefault();
    const messageToAdd = {
      author: user.email,
      timestamp: Date.now(),
      text: message,
      chat: user.chat,
    };
    socket.emit("addMessage", user, messageToAdd);
    setMessage("");
    e.target[0].focus();
  };
  const scrollToBottom = () => {
    lastMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {user.validated ? (
        isLoading ? (
          <Loader />
        ) : (
          <div className="chat">
            <h2>Hablar con soporte</h2>
            <div className="messages">
              {messages.length === 0 ? (
                <p className="placeholder">Tus mensajes aparecerán aquí</p>
              ) : (
                messages.map((e, i) => (
                  <div key={i}>
                    <span>
                      {e.author} -{" "}
                      {new Date(e.timestamp).toLocaleString("es-AR", "short")}:
                    </span>
                    <p>{e.text}</p>
                  </div>
                ))
              )}
              <div ref={lastMessage}></div>
            </div>
            <form className="newMessage" onSubmit={submit}>
              <div>
                <label>{user.username}:</label>
                <input
                  type="text"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
              </div>

              <input type="submit" className="button" value="Enviar" />
            </form>
          </div>
        )
      ) : (
        <Navigate to="/autenticacion" />
      )}
    </div>
  );
};

export default Support;
