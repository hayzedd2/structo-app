"use client";

import { useMockData } from "@/hooks/useMockData";
import { structSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import ResponseBlock from "./ResponseBlock";
import FormMessage from "./FormMessage";
import formatCode from "@/helpers/FormatCode";
import { FormError } from "./FormError";
import LanguageSelector from "./LanguageSelector";
import About from "./About";

const InterfaceForm = () => {
  const languages = [
    { code: "typescript", name: "Typescript" },
    { code: "golang", name: "Golang" },
  ];
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const { handleSubmit, formState, register, control } = useForm<
    z.infer<typeof structSchema>
  >({
    resolver: zodResolver(structSchema),
    defaultValues: {
      interface: "",
      count: 0,
      language: selectedLanguage.code,
    },
  });
  const { mutate, data, isPending, error } = useMockData();
  const onSubmit = async (data: z.infer<typeof structSchema>) => {
    try {
      const formattedCode = await formatCode(data.interface, "typescript");
      data.interface = formattedCode;
      mutate(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" min-h-screen  max-w-[65rem] mx-auto px-4 py-10 flex-col justify-center flex items-center gap-7">
      <About />
      <div className="flex-wrap w-full flex items-center justify-center gap-7">
        <div className="w-full md:w-[30rem] light-shadow rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="header flex  justify-between p-4">
              <div className="flex flex-col">
                {formState.errors.language &&
                  formState.errors.language.message && (
                    <FormMessage text={formState.errors.language.message} />
                  )}
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <LanguageSelector
                      languages={languages}
                      selectedLanguage={selectedLanguage}
                      onSelectLanguage={(lang) => {
                        field.onChange(lang.code);
                        setSelectedLanguage(lang);
                      }}
                      className="mt-1"
                    />
                  )}
                />
              </div>
              <div className="controls items-center justify-center  flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="bg-[#E1E8F1] rounded-full w-[8px] h-[8px]"
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="px-4 pb-4 mt-2">
              {formState.errors.interface &&
                formState.errors.interface.message && (
                  <FormMessage text={formState.errors.interface.message} />
                )}
              <textarea
                {...register("interface")}
                placeholder="Your interface or type here."
                spellCheck={false}
                className="flex-grow selection:bg-[#CCFBF1] outline-none focus:outline-none border-none text-[13px] font-[500] scrollable-textbox  resize-none min-h-[15rem] w-full"
                id=""
              ></textarea>
              <div className="text-[12px] mt-4">
                <p className="text-[13px] font-[500]">Count</p>
              </div>
              <div className="w-full flex justify-between mt-2">
                <div className="flex flex-col ">
                  <input
                    className="light-shadow max-w-[50px] focus:outline-none  px-2 py-1 flex items-center justify-center rounded-[6px]"
                    type="text"
                    inputMode="numeric"
                    {...register("count", { valueAsNumber: true })}
                    id=""
                  />
                  {formState.errors.count && formState.errors.count.message && (
                    <FormMessage text={formState.errors.count.message} />
                  )}
                </div>

                <button
                  className="bx-shadow disabled:opacity-50 disabled:cursor-not-allowed text-[14px] h-max rounded-[5px]  bg-black px-3 py-2 text-white"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Generating" : "Generate data"}
                </button>
              </div>
            </div>
            {error && <FormError message={error.message} />}
          </form>
        </div>
        <ResponseBlock data={data} />
      </div>
    </div>
  );
};

export default InterfaceForm;
