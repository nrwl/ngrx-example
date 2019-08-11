import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';

import { Talk } from '@ngrx-example/api-interfaces';

const talks = [
  {
    id: 898,
    title: 'Are we there yet?',
    speaker: 'Rich Hickey',
    description:
      'In his keynote at JVM Languages Summit 2009, Rich Hickey advocated for the reexamination of basic principles like state, identity, value, time, types, genericity, complexity, as they are used by OOP today, to be able to create the new constructs and languages to deal with the massive parallelism and concurrency of the future.',
    yourRating: null,
    rating: 9.1
  },
  {
    id: 777,
    title: 'The Value of Values',
    speaker: 'Rich Hickey',
    description:
      'Rich Hickey compares value-oriented programming with place-oriented programming concluding that the time of imperative languages has passed and it is the time of functional programming.',
    yourRating: null,
    rating: 8.5
  },
  {
    id: 466,
    title: 'Simple Made Easy',
    speaker: 'Rich Hickey',
    description:
      'Rich Hickey emphasizes simplicity’s virtues over easiness’, showing that while many choose easiness they may end up with complexity, and the better way is to choose easiness along the simplicity path.',
    yourRating: null,
    rating: 8.2
  },
  {
    id: 322,
    title: 'Growing a Language',
    speaker: 'Guy Steele',
    description:
      "Guy Steele's keynote at the 1998 ACM OOPSLA conference on 'Growing a Language' discusses the importance of and issues associated with designing a programming language that can be grown by its users.",
    yourRating: null,
    rating: 8.9
  }
];

@Controller()
export class AppController {
  @Get('talks')
  talks(@Query() filters: any): Talk[] {
    console.log('GET /talks', 'filters:', filters);
    return talks.filter(t => {
      const titlePass = filters.title
        ? t.title.indexOf(filters.title) > -1
        : true;
      const speakerPass = filters.speaker
        ? t.speaker.indexOf(filters.speaker) > -1
        : true;
      const ratingPass = filters.minRating
        ? t.rating >= +filters.minRating
        : true;
      return titlePass && speakerPass && ratingPass;
    });
  }

  @Get('talk')
  talk(@Query() filters: any): Talk {
    const id = +filters.id;
    console.log('GET /talk', 'id:', id);
    return talks.filter(t => t.id === id)[0];
  }

  @Post('rate')
  rate(@Body() body: any): { status: string } {
    const id = body.id;
    const yourRating = body.yourRating;
    console.log('POST  /rate', 'id:', id, 'yourRating:', yourRating);
    const talk = talks.filter(t => t.id === id)[0];
    talk.yourRating = yourRating;
    return { status: 'OK' };
  }
}
