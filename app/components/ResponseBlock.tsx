"use client";
import React from "react";
import CopyToClipBoard from "./CopyToClipBoard";
import { AnimatePresence, motion } from "motion/react";
import Empty from "./Empty";
interface ResponseProps {
  data: any;
}
interface User {
  userId: string;
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  DOB: Date;
  followers: number;
  skills: string[];
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  hasPremium: boolean;
  contributionScores: number[];
}
const ResponseBlock = ({ data }: ResponseProps) => {
  const formatWithWrapping = (json: string, maxLineLength: number = 80) => {
    if(!json){
      return null
    }
    let formatted = JSON.stringify(json, null, 2);
    const lines = formatted.split("\n");
    return lines
      .map((line) => {
        if (line.length > maxLineLength) {
          const indent = line.match(/^\s*/)?.[0] || "";
          return line.replace(
            new RegExp(`.{${maxLineLength}}`, "g"),
            `$&\n${indent}  `
          );
        }
        return line;
      })
      .join("\n");
  };
  const formattedJson = formatWithWrapping(data) ?? ""
  const [isExpanded, setIsExpanded] = React.useState(false);
  const IconExpand = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer"
      onClick={() => setIsExpanded(true)}
    >
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  );
  return (
    <>
      {!isExpanded && (
        <motion.div
          layoutId="responseBlock"
          transition={{
            ease: "easeInOut",
            duration: 0.35,
          }}
          className="w-full md:w-[30rem] light-shadow rounded-xl"
        >
          {data && data.length > 0 && (
            <motion.div
              layoutId="controlsbox"
              className="header w-full  flex items-center justify-end p-4"
            >
              <motion.div
                layoutId="controls"
                transition={{
                  ease: "easeInOut",
                  duration: 0.35,
                }}
                className="controls flex gap-4"
              >
                <CopyToClipBoard text={formattedJson} />
                <IconExpand />
              </motion.div>
            </motion.div>
          )}
          <div className="px-4 pb-4 mt-2">
            {data ? (
              <textarea
                value={formattedJson}
                readOnly
                spellCheck={false}
                name=""
                className="flex-grow  selection:bg-[#CCFBF1] scrollable-textbox outline-none text-[13px] font-[500] border-none focus:outline-none resize-none min-h-[30rem] w-full"
                id=""
              ></textarea>
            ) : (
              <Empty />
            )}
          </div>
        </motion.div>
      )}
      <ExpandedResponseBlock
        setIsExpanded={setIsExpanded}
        formattedJson={formattedJson}
        isExpanded={isExpanded}
      />
    </>
  );
};

export default ResponseBlock;

interface ExpandedProps {
  formattedJson: any;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const ExpandedResponseBlock = ({
  formattedJson,
  isExpanded,
  setIsExpanded,
}: ExpandedProps) => {
  const IconMinimize = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer"
      onClick={() => setIsExpanded(false)}
    >
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" x2="21" y1="10" y2="3" />
      <line x1="3" x2="10" y1="21" y2="14" />
    </svg>
  );
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          animate={{
            backgroundColor: "#333333",
          }}
          exit={{
            transition: {
              ease: "easeInOut",
              duration: 2,
            },
            backgroundColor: "transparent",
          }}
          transition={{
            ease: "easeInOut",
          }}
          className="min-h-screen px-4 absolute flex items-center justify-center w-full top-0"
        >
          <motion.div
            transition={{
              ease: "easeInOut",
              duration: 0.35,
            }}
            layoutId="responseBlock"
            className="w-full lg:w-[70rem] bg-white z-[50]  light-shadow rounded-xl"
          >
            <motion.div
              layoutId="controlsbox"
              className="header flex items-center justify-end p-4"
            >
              <motion.div
                layoutId="controls"
                transition={{
                  ease: "easeInOut",
                  duration: 0.35,
                }}
                className="controls flex gap-4"
              >
                <CopyToClipBoard text={formattedJson} />
                <IconMinimize />
              </motion.div>
            </motion.div>
            <div className="px-4 pb-4 mt-2">
              <textarea
                value={formattedJson}
                readOnly
                spellCheck={false}
                name=""
                className="flex-grow selection:bg-[#CCFBF1] scrollable-textbox outline-none text-[13px] font-[500] border-none focus:outline-none resize-none min-h-[30rem] lg:min-h-[35rem] w-full"
                id=""
              ></textarea>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
