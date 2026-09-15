'use client';

import {Api} from '@/shared/services/api-client';
import React, {useEffect} from 'react';
import {Container} from './container';
import {cn} from '@/shared/lib/utils';
import {X} from 'lucide-react';
import {IStory} from "@/shared/services/stories";
import ReactStories from 'react-insta-stories';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({className}) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('my-6 flex gap-2 overflow-x-auto pb-1 sm:my-10 lg:items-center lg:justify-between lg:overflow-hidden', className)}>
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="h-[180px] w-[140px] shrink-0 animate-pulse rounded-md bg-gray-200 sm:h-[250px] sm:w-full sm:max-w-[200px]"/>
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="h-[180px] w-[140px] shrink-0 cursor-pointer rounded-md object-cover sm:h-[250px] sm:w-full sm:max-w-[200px] lg:flex-1"
            height={250}
            width={200}
            src={story.previewImageUrl}
            alt='stories'/>
        ))}

        {open && (
          <div className="fixed inset-0 z-30 flex h-full w-full items-center justify-center bg-black/80 px-4">
            <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-hidden">
              <button className="absolute -right-1 -top-1 z-30 sm:-right-10 sm:-top-5" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50"/>
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({url: item.sourceUrl})) || []}
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
