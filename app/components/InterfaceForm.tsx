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

interface Person {
  age: Record<string, string>;
}
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
      console.log(data);
      mutate(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" min-h-screen  px-4 py-10 flex-wrap justify-center flex items-center gap-7">
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
              spellCheck={false}
              className="flex-grow outline-none focus:outline-none border-none text-[12px] scrollable-textbox  resize-none min-h-[15rem] w-full"
              id=""
            ></textarea>
            <div></div>
            <div className="text-[12px]">Count</div>
            <div className="w-full flex justify-between mt-2">
              <div className="flex flex-col ">
                <input
                  className="light-shadow max-w-[50px]  px-3 py-2 flex items-center justify-center rounded-[6px]"
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
                Generate Data
              </button>
            </div>
          </div>
          {error && <FormError message={error?.message} />}
        </form>
      </div>
      <ResponseBlock data={data} />
    </div>
  );
};

export default InterfaceForm;
