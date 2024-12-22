import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarImage } from '../ui/avatar';
import { GeneratorService, prompts } from '@/services/GeneratorService';
import { useSkillStore } from '@/store/skill-store';
import { useLoading } from '@/providers/LoadingProvider';
import { useProfileStore } from '@/store/profile-store';

export default function PersonalForm() {
  const { profile, updateData } = useProfileStore();
  const { skills } = useSkillStore();
  const { isLoading, setIsLoading } = useLoading();
  const handleGenerateProfileSummary = async () => {
    setIsLoading(true);
    const knownTechnologies = skills.join(',');
    const prompt = prompts.profileSummary(
      profile.firstName,
      profile.lastName,
      profile.position,
      knownTechnologies,
      profile.summary
    );
    const newProfileSummary = await GeneratorService.generateText(prompt);
    updateData('summary', newProfileSummary);
    setIsLoading(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files && event.target.files?.[0]) {
      reader.onloadend = () => {
        const url = reader.result as string;
        updateData('image', url);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="w-full mt-4 font-normal">
        <div className="flex flex-col sm:flex-row gap-4 mb-4 ">
          {/* <div className="max-w-72 w-full">
            <Label>
              <Avatar className="w-24 h-24">
                <AvatarImage
                  className="w-full h-full object-cover"
                  src={profile.image}
                ></AvatarImage>
              </Avatar>
              <Input
                onChange={handleImageChange}
                type="file"
                className="hidden"
                accept="image/*"
              />
            </Label>
          </div> */}
          <div className="w-full">
            <Label htmlFor="position">Current Position / Desired Position (Optional)</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('position', e.target.value)
              }
              value={profile.position}
              placeholder="Current Position / Desired Position"
              id="position"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 ">
          <div className="max-w-72 w-full">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('firstName', e.target.value)
              }
              value={profile.firstName}
              placeholder="First Name"
              id="firstName"
            />
          </div>
          <div className="max-w-72 w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('lastName', e.target.value)
              }
              value={profile.lastName}
              placeholder="Last Name"
              id="lastName"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="max-w-72 w-full">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('phone', e.target.value)
              }
              value={profile.phone}
              placeholder="Phone Number"
              id="phone"
              type="text"
            />
          </div>
          <div className="max-w-72 w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('email', e.target.value)
              }
              value={profile.email}
              placeholder="Email"
              id="email"
              type="email"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="max-w-72 w-full">
            <Label htmlFor="github">Github</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('github', e.target.value)
              }
              value={profile.github}
              placeholder="Github"
              id="github"
            />
          </div>
          <div className="max-w-72 w-full">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              className="mt-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateData('linkedin', e.target.value)
              }
              value={profile.linkedin}
              placeholder="LinkedIn"
              id="linkedin"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4"></div>
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <Label htmlFor="summary">Profile Summary</Label>
            <Button
              onClick={handleGenerateProfileSummary}
              className="text-gray-400 hover:text-green-500"
              variant={'ghost'}
            >
              Generate
            </Button>
          </div>
          <Textarea
            className="h-36 mt-1"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateData('summary', e.target.value)
            }
            placeholder="Profile Summary"
            id="summary"
            value={profile.summary}
          />
        </div>
      </div>
    </>
  );
}
