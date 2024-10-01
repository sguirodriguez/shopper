import { GoogleGenerativeAI } from "@google/generative-ai";
import { ErrorHandler } from "../../config/errors/error-handler";
import configuration from "../../config";

const genAI = new GoogleGenerativeAI(String(configuration.geminiKey));

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const measureWithGemini = async ({
  data,
  mimeType
}: {
  data: string;
  mimeType: string;
}) => {
  const prompt =
    "Qual a medição em valor dessa foto? retorne apenas o valor da medição sem textos.";
  const imageMock = {
    inlineData: {
      data,
      mimeType
    }
  };

  const result = await model.generateContent([prompt, imageMock]);

  if (!result) {
    throw new ErrorHandler(
      "Can't measure with Gemini",
      "IMAGE_MEASURE_ERROR_GEMINI"
    );
  }

  return result.response.candidates?.[0]?.content.parts?.[0].text;
};

export { measureWithGemini };
