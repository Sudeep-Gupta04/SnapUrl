import React from "react";
import "./card.css"; // Import the CSS file
import { motion } from "framer-motion";

const Card = ({ title, desc, icon }) => {
  // Extract emoji from title if present
  const emojiMatch = title.match(/^(\p{Emoji}+)\s*/u);
  const emoji = emojiMatch ? emojiMatch[1] : null;
  const titleText = emoji ? title.replace(/^(\p{Emoji}+)\s*/u, '') : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-container"
    >
      {emoji && <div className="card-emoji">{emoji}</div>}
      {!emoji && icon && <div className="card-icon-wrapper">{icon}</div>}
      <h1 className="card-title">{titleText}</h1>
      <p className="card-description">{desc}</p>
    </motion.div>
  );
};

export default Card;
