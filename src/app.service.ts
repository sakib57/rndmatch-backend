import { Injectable } from '@nestjs/common';

const meetUs = {
  organization: 'Softify Digital',
  website: 'https://softifydigital.com/',
  Admin: {
    name: 'Naim Chowdhury',
    email: '',
    mobile: '',
    socials: [
      {
        whatsapp: '',
        linkedIn: '',
        facebook: '',
        instagram: '',
        portfolio: '',
      },
    ],
  },
  'Team Lead': {
    name: 'Md Ataur Rahman Bhuiyan',
    email: {
      personal: 'roomeyrahman@gmail.com',
    },
    mobile: '+8801911823855',
    socials: [
      {
        whatsapp: '+8801911823855',
        linkedIn: 'https://www.linkedin.com/in/md-ataur-rahman-bhuiyan/',
        medium: 'https://medium.com/@roomeyrahman',
        'google scholar':
          'https://scholar.google.com/citations?user=N4EY4rgAAAAJ&hl=en',
        portfolio: 'https://roomey.vercel.app/',
      },
    ],
  },
  'Project Manager': {
    name: 'Quazi Mahabubul Hasan',
    email: {
      personal: 'hridoyhasan14@gmail.com',
    },
    mobile: '01913628410',
    socials: [
      {
        whatsapp: '01913628410',
        linkedIn: 'https://www.linkedin.com/in/quazi-mahabubul-hasan-86713ba1/',
      },
    ],
  },
  Teams: [
    {
      name: 'Sakib',
      role: 'Software Engineer Backend',
      email: {
        personal: '',
      },
      mobile: '',
      socials: [
        {
          whatsapp: '',
          linkedIn: '',
          facebook: '',
          instagram: '',
          portfolio: '',
        },
      ],
    },
    {
      name: 'Mohiuddin',
      role: 'Software Engineer Frontend',
      email: {
        personal: '',
      },
      mobile: '',
      socials: [
        {
          whatsapp: '',
          linkedIn: '',
          facebook: '',
          instagram: '',
          portfolio: '',
        },
      ],
    },
    {
      name: 'Yeasen',
      role: 'Software Engineer (Frontend and Mobile)',
      email: {
        personal: '',
      },
      mobile: '',
      socials: [
        {
          whatsapp: '',
          linkedIn: '',
          facebook: '',
          instagram: '',
          portfolio: '',
        },
      ],
    },
    {
      name: 'Maryam Rasheed',
      role: 'Software Engineer (Intern)',
      email: {
        personal: 'maryamrasheed687@gmail.com',
      },
      mobile: '+923106764990',
      socials: [
        {
          whatsapp: '+923106764990',
          linkedIn: 'https://www.linkedin.com/in/maryam-rasheed-bba15a240/',
          instagram: 'https://www.instagram.com/maryamdevelops/',
        },
      ],
    },
    {
      name: 'Ruhin Jahan',
      role: 'Sales & Marketing (Intern)',
      email: {
        personal: 'ruhinjahan96@gmail com',
      },
      mobile: '+8801648-382750',
      socials: [
        {
          whatsapp: '+8801745178562',
          linkedIn: 'https://www.linkedin.com/in/ruhin-jahan-39a72b253',
          facebook: 'https://www.facebook.com/rj.joty.1',
        },
      ],
    },
  ],
};

@Injectable()
export class AppService {
  getHello() {
    return meetUs;
  }
}
