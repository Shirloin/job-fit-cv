import CompanyRepository from "@/repositories/CompanyRepository";
import UserRepository from "@/repositories/UserRepository";
import axios from "axios";
import OpenAI from "openai";

const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});
export class GeneratorService {
  static async generateRecommendedJob(
    skills: string[],
    projectDescription: string[],
    experienceDescription: string[],
    userId: string
  ) {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/recommendation`,
      {
        skills,
        projectDescription,
        experienceDescription,
        userId,
      }
    );
  }

  static async generateText(prompt: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    return response.choices[0].message.content!.trim();
  }
}

export const prompts = {
  profileSummary: (
    firstname: string,
    lastname: string,
    currentPosition: string,
    knownTechnologies: string,
    previousSummary: string
  ) => {
    const fullName = firstname + " " + lastname;
    let prompt = `
            Please provide a professional bio description (100 words) for my resume using the following details (first person writing):\n 
            previousSummary: ${previousSummary} \n
            name: ${fullName} \n 
            role: ${currentPosition} without years of experience. \n`;

    if (knownTechnologies) {
      prompt += `I write in the technologies: ${knownTechnologies}.`;
    }
    return prompt;
  },
  experienceSummary: (
    position: string,
    company: string,
    type: string,
    previousSummary: string
  ) => {
    let prompt = `
        Please provide a professional bio experience description (100 words) for my resume using the following details: \n
        previousSummary: ${previousSummary}\n
        position title: ${position}\n
        company name: ${company} \n
        experience type: ${type} \n
        `;
    return prompt;
  },
  projectSummary: (title: string, previousSummary: string) => {
    let prompt = `
        Please provide a professional project description (50 words) for my resume using the following details (first person writing): \n
        previousSummary: ${previousSummary}\n
        project title: ${title}\n
        `;
    return prompt;
  },
  // jobResponsibilities: (fullName: string, currentPosition: string, workingExperience: string, knownTechnologies: string) =>  `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${workingExperience} years). \n I write in the technolegies: ${knownTechnologies}. Can you write 3 points for a resume on what I am good at?`,
  // workHistory: (fullName: string, currentPosition: string, workingExperience: string, details: TCompany[]) => `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${workingExperience} years). ${companyDetails(details)} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`,
};
