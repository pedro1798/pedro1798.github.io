const quotes = [
  {
    quote: "“Without music, life would be a mistake.”",
    author: "-Friedrich Nietzsche, Twilight of the Idols",
  },
  {
    quote: "“That which does not kill us makes us stronger.”",
    author: "-Friedrich Nietzsche",
  },
  {
    quote:
      "“And those who were seen dancing were thought to be insane by those who could not hear the music.”",
    author: "-Friedrich Nietzsche",
  },
  {
    quote: "“You must have chaos within you to give birth to a dancing star.”",
    author: "-Friedrich Nietzsche",
  },
  {
    quote:
      "“Don't walk in front of me… I may not follow\nDon't walk behind me… I may not lead\nWalk beside me… just be my friend”",
    author: "-Arbert Camus",
  },
  {
    quote:
      "“You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.”",
    author: "-Arbert Camus",
  },
  {
    quote:
      "“Nobody realizes that some people expend tremendous energy merely to be normal”",
    author: "-Arbert Camus",
  },
  {
    quote: "“Should I kill myself, or have a cup of coffee?”",
    author: "-Arbert Camus",
  },
  {
    quote:
      "“But in the end one needs more courage to live than to kill himself.”",
    author: "-Arbert Camus",
  },
  {
    quote:
      "“The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.”",
    author: "-Arbert Camus",
  },
  {
    quote: "“Pain is inevitable. Suffering is optional.”",
    author: "-Buddha",
  },
  {
    quote: "“The root of all suffering is attachment.”",
    author: "-Buddha",
  },
  {
    quote: "“Suffering is not holding you, you are holding suffering.”",
    author: "-Buddha",
  },
  {
    quote:
      "“Believe nothing, no matter where you read it, or who said it, no matter if I have said it, unless it agrees with your own reason and your own common sense.”",
    author: "-Buddha",
  },
  {
    quote: "“You only lose what you cling to.”",
    author: "-Buddha",
  },
  {
    quote:
      "“Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.”",
    author: "-Buddha",
  },
  {
    quote:
      "“Ardently do today what must be done. Who knows? Tomorrow, death comes.”",
    author: "-Buddha",
  },
  {
    quote:
      "“When I look at my life and its secret colours, I feel like bursting into tears.”",
    author: "-Albert Camus, A Happy Death",
  },
  {
    quote: "“To be happy, we must not be too concerned with others.”",
    author: "-Albert Camus",
  },
  {
    quote:
      "“When the soul suffers too much, it develops a taste for misfortune.”",
    author: "-Albert Camus, The First Man",
  },
  {
    quote: "“People hasten to judge in order not to be judged themselves.”",
    author: "-Albert Camus, The Fall",
  },
  {
    quote:
      "“If you only read the books that everyone else is reading, you can only think what everyone else is thinking.”",
    author: "Haruki Murakami, Norwegian Wood",
  },
  {
    quote:
      "“Memories warm you up from the inside. But they also tear you apart.”",
    author: "-Haruki Murakami, Kafka on the Shore",
  },
  {
    quote: "“If you remember me, then I don't care if everyone else forgets.”",
    author: "-Haruki Murakami, Kafka on the Shore",
  },
  {
    quote:
      "“Whatever it is you're seeking won't come in the form you're expecting.”",
    author: "-Haruki Marukami",
  },
  {
    quote: '“What happens when people open their hearts?"\n"They get better.”',
    author: "-Haruki Murakami, Norwegian Wood",
  },
];

const quote = document.querySelector("#quote span:first-child i b");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
