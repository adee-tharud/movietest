import batmanImg from '../assets/img/shows/batman.svg';
import spidermanImg from '../assets/img/shows/spiderman.svg';
import wildwestImg from '../assets/img/shows/wild.svg';

export const PRE_LOADED_SHOWS = [
  {
    id: 1,
    name: 'Batman Returns',
    image: batmanImg,
    url: '',
    type: 'Action',
    summary:
      '<p>Batman Returns is a 1992 American superhero film directed by Tim Burton, based on the DC Comics character Batman. It is the sequel to the 1989 film Batman and stars Michael Keaton as Bruce Wayne / Batman, alongside Danny DeVito, Michelle Pfeiffer, Christopher Walken, and Michael Gough.</p>',
  },
  {
    id: 2,
    name: 'Wild Wild West',
    image: wildwestImg,
    url: '',
    type: 'Adventure',
    summary:
      "<p>Special Agent Jim West and inventive US Marshal Artemus Gordon are ordered by President Ulysses Grant to team up to save the world from Dr Arliss Loveless's enormous steam-powered tarantula.</p>",
  },
  {
    id: 3,
    name: 'The Amazing Spiderman',
    image: spidermanImg,
    url: '',
    type: 'Fantasy',
    summary:
      "<p>Peter Parker, an outcast high school student, gets bitten by a radioactive spider and attains superpowers. While unravelling his parents' disappearance, he must fight against the Lizard.</p>",
  },
];