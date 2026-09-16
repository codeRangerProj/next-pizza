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
  const [storyModalSize, setStoryModalSize] = React.useState({width: 520, height: 800});

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  useEffect(() => {
    const updateStoryModalSize = () => {
      const width = Math.min(window.innerWidth - 26, 520);
      const heightRatio = window.innerWidth < 768
        ? 0.65
        : window.innerWidth < 1024
          ? 0.8
          : 0.95;
      const height = Math.min(window.innerHeight * heightRatio, 800);

      setStoryModalSize({width, height});
    };

    updateStoryModalSize();
    window.addEventListener('resize', updateStoryModalSize);

    return () => window.removeEventListener('resize', updateStoryModalSize);
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('my-6 flex gap-2 overflow-x-auto pb-2 md:my-8 lg:my-10 lg:items-center lg:justify-between lg:overflow-hidden', className)}>
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="h-[180px] w-[120px] shrink-0 animate-pulse rounded-md bg-gray-200 sm:h-[220px] sm:w-[160px] md:h-[240px] md:w-[180px] lg:h-[250px] lg:w-[200px]"/>
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="h-[180px] w-[120px] shrink-0 cursor-pointer rounded-md object-cover sm:h-[220px] sm:w-[160px] md:h-[240px] md:w-[180px] lg:h-[250px] lg:w-[200px] lg:flex-1"
            height={250}
            width={200}
            src={story.previewImageUrl}
            alt='stories'/>
        ))}

        {open && (
          <div
            className="fixed inset-0 z-30 flex h-full w-full items-center justify-center bg-black/80 p-4 md:p-6"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative w-full max-w-[520px]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Закрыть историю"
                className="absolute right-0 -top-10 z-30 rounded-full bg-black/40 p-1.5 md:-right-12 md:-top-5"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6 text-white/80 md:h-8 md:w-8"/>
              </button>

              <div className="overflow-hidden rounded-xl">
                <ReactStories
                  onAllStoriesEnd={() => setOpen(false)}
                  stories={selectedStory?.items.map((item) => ({url: item.sourceUrl})) || []}
                  defaultInterval={3000}
                  width={storyModalSize.width}
                  height={storyModalSize.height}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};