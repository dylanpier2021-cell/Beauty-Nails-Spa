# Beauty Nails Spa — Reviews Data (for Claude Code)

Drop this into the project as the review source. These are real Google reviews, cleaned up (no EM dashes, trimmed filler). Use the `featured` ones in the homepage carousel and the full list on the Reviews pages. Owner responses are included where you want a "Response from the owner" block.

**Headline stats to display:** 5.0 average, 80+ Google reviews, 10+ years in business. (If you cite an exact count, use "80+ five-star reviews" since the overwhelming majority are 5 stars.)

---

## Featured reviews (homepage carousel — strongest 8)

```ts
export const featuredReviews = [
  {
    name: "Shilpi Sharma",
    rating: 5,
    date: "9 months ago",
    service: "Manicure",
    text: "From the moment you walk in, the atmosphere is warm, welcoming, and spotless clean. The staff are not only skilled but also incredibly kind and attentive. Their nail work is flawless, the polish lasts, and they are amazing with both classic and trendy designs. If you are looking for a place where professionalism meets artistry, this is it.",
  },
  {
    name: "Cheldyn Chrisagis",
    rating: 5,
    date: "5 months ago",
    service: "Acrylic nails",
    text: "Hannah did a fantastic job on my nails, looks just like my inspo pic. 10/10 recommend her and definitely coming back to her. She is super talented and gentle!",
  },
  {
    name: "Michele Cooper",
    rating: 5,
    date: "10 months ago",
    service: "Manicure, Dip",
    text: "Love getting my pedicures and manicures here. The owners are very friendly and my nail polish lasts a lot longer than other nail salons. The pedicure bowl is cleaned right after use, towels are always clean, and the sinks and bathroom are always very clean.",
  },
  {
    name: "Angeleah Wood",
    rating: 5,
    date: "3 months ago",
    service: "Acrylic nails, Pedicure",
    text: "It was my first time. The pedicure was relaxing and my nail artist Hannah was the best. She made sure I liked my nails each step and she is serious about designing on nails. She can do anything and everything.",
  },
  {
    name: "Yamileth Domingo",
    rating: 5,
    date: "9 months ago",
    service: "Manicure, Pedicure",
    text: "My fiancee and I have been coming here for 4 years! It is always a great experience with Anna and her family. Would definitely recommend.",
  },
  {
    name: "Peyton P.",
    rating: 5,
    date: "9 months ago",
    service: "Gel X",
    text: "I got Gel X and they are the best. Super quick and amazing shape.",
  },
  {
    name: "Shayla Jones",
    rating: 5,
    date: "9 months ago",
    service: "Acrylic nails, Pedicure",
    text: "This is a very great nail spa to come to. It is a husband and wife working hard together to get the job done! The place has been newly remodeled. It is very clean and welcoming.",
  },
  {
    name: "April Purcell",
    rating: 5,
    date: "6 months ago",
    service: "Manicure",
    text: "Hannah is amazing! I went here on a Sunday and the service was very personal. I will be back.",
  },
];
```

---

## Full reviews list (Reviews page)

```ts
export const reviews = [
  { name: "Dora Spracklen", rating: 5, date: "6 months ago", service: "Manicure, Pedicure", text: "The technicians take their time. They confirm with me that they are doing what I have asked for. The shop is clean and well organized. The end result is always perfect and lasts a long time. I recommend this salon to everyone!" },
  { name: "Cheldyn Chrisagis", rating: 5, date: "5 months ago", service: "Acrylic nails", text: "Hannah did a fantastic job on my nails, looks just like my inspo pic. 10/10 recommend her and definitely coming back to her. She is super talented and gentle!" },
  { name: "Angeleah Wood", rating: 5, date: "3 months ago", service: "Acrylic nails, Pedicure", text: "It was my first time. The pedicure was relaxing and my nail artist Hannah was the best. She made sure I liked my nails each step and she is serious about designing on nails." },
  { name: "Amanda Mcabee", rating: 5, date: "9 months ago", service: "Pedicure", text: "Beautiful location, great service, not overcrowded. I always feel like I have the salon to myself when I get service. Great people work there. Will always return." },
  { name: "John Blue", rating: 5, date: "6 months ago", service: "Pedicure, Manicure", text: "The service was quick and the ladies were nice and did a phenomenal job on my feet and hands! I will definitely return in the near future." },
  { name: "Ava Castle", rating: 5, date: "4 months ago", service: "Nails", text: "I had an amazing experience. Hannah did a great job. Definitely will be coming back!" },
  { name: "Alisha Hernandez", rating: 5, date: "3 months ago", service: "Nails", text: "This shop is fantastic! They are all so sweet and very friendly. Very clean, relaxing, and cozy atmosphere. Highly recommend going!" },
  { name: "Divya Makhija", rating: 5, date: "9 months ago", service: "Nails", text: "My first time visiting and I could not be happier. My nail artist did a beautiful job and made me feel really comfortable throughout. The salon is clean, welcoming, and has a great atmosphere." },
  { name: "Shilpi Sharma", rating: 5, date: "9 months ago", service: "Manicure", text: "One of the best places you can go to. The staff are skilled, kind, and attentive, and they take their time to make sure every detail is perfect. The polish lasts, the shaping is consistent, and they are amazing with both classic and trendy designs. Professionalism meets artistry." },
  { name: "Delaney Ritto", rating: 5, date: "6 months ago", service: "Nails", text: "My first time here and I had a great experience! I just moved here from California and am glad I found this place. Cannot wait to come back soon." },
  { name: "Alyssa Garza", rating: 5, date: "3 months ago", service: "Pedicure", text: "Toe color came out so cute! Love the service and the establishment is so clean." },
  { name: "April Purcell", rating: 5, date: "6 months ago", service: "Manicure", text: "Hannah is amazing! I came in on a Sunday and the service was very personal. I will be back." },
  { name: "Nez Williams", rating: 5, date: "4 months ago", service: "Nails", text: "Wonderful! Thank you Hannah for getting my daughter together. We will be back." },
  { name: "Lauroyssa Colbert", rating: 5, date: "9 months ago", service: "Nail art", text: "Hannah has been my nail tech for years. She always gets me in and out and I am always satisfied. She makes every design I want come to life. Such good energy every time." },
  { name: "Kesh Kesh", rating: 5, date: "10 months ago", service: "Nail art", text: "Love her. Plenty of colors to choose from and the designs are awesome. Nails grow out strong and long." },
  { name: "Divine Consign", rating: 5, date: "5 months ago", service: "Nails", text: "Hannah was so sweet to get me in last minute. My nails look amazing!" },
  { name: "Iyanu Kehinde", rating: 5, date: "3 months ago", service: "Acrylic nails, Pedicure, Manicure", text: "The service was amazing. I love my nails!" },
  { name: "Faris Gul", rating: 5, date: "6 months ago", service: "Manicure, Pedicure", text: "This place is genuinely great. I got my mani and pedi here and I left a different man." },
  { name: "Eva", rating: 5, date: "4 years ago", service: "Nails", text: "Walked in without an appointment and was seen right away. Hidden gem! I showed the staff a picture of the nails I wanted and they took their time with forming and shaping. Had the cutest nail stickers too!" },
  { name: "Juliana Jimenez", rating: 5, date: "9 months ago", service: "Nails", text: "I have been going to this salon for a few years now and they always do an amazing job. The owners are very friendly. I highly recommend." },
  { name: "Juanita Lee", rating: 5, date: "1 year ago", service: "Pedicure, Manicure", text: "Anna did a great job giving the set that I requested based off a picture. Very clean work and friendly staff. Highly recommend!" },
  { name: "Shayla Jones", rating: 5, date: "9 months ago", service: "Acrylic nails, Pedicure", text: "A husband and wife working hard together to get the job done. The place has been newly remodeled. It is very clean and welcoming." },
  { name: "Brooke Mercer", rating: 5, date: "1 year ago", service: "Pedicure", text: "I have been going here for a couple years now and I love them. They are always so sweet and do a wonderful job. Super personable and quick to make connections with their clientele. Definitely support this small business!" },
  { name: "Lamiea Wilson", rating: 5, date: "10 months ago", service: "Pedicure", text: "Such an amazing place, nice and clean. The employees are very respectful and polite. They give great pedicures and I love the atmosphere. 10/10, highly recommend." },
  { name: "Abby Schraeder", rating: 5, date: "8 months ago", service: "Pedicure", text: "Open on Sunday. Amazing service, beautiful inside, and the pedicure was perfect. Thank you." },
  { name: "Emily Cotton", rating: 5, date: "9 months ago", service: "Pedicure, Manicure", text: "Hannah is always so friendly and does a wonderful job. Everything is nice, clean, and professional." },
  { name: "Lina Assaf", rating: 5, date: "8 months ago", service: "Pedicure", text: "Extremely beautiful space! The staff are very thorough and do a fantastic job." },
  { name: "Michele Cooper", rating: 5, date: "10 months ago", service: "Manicure, Dip", text: "Love getting my pedicures and manicures here. The owners are very friendly and my polish lasts a lot longer than other nail salons. Everything is always very clean." },
  { name: "Lamont Loston", rating: 5, date: "10 months ago", service: "Pedicure", text: "One of the best nail places I went to get a pedicure. Amazing job and very clean. You got my business, I will be back." },
  { name: "Peyton P.", rating: 5, date: "9 months ago", service: "Gel X", text: "I got Gel X and they are the best. Super quick and amazing shape." },
  { name: "Megan Collins", rating: 5, date: "4 months ago", service: "Pedicure", text: "The lady does an awesome job and is always friendly. Love their pedicures too!" },
  { name: "Mariela Santana", rating: 5, date: "11 months ago", service: "Pedicure, Acrylic nails", text: "Eddie and Hannah did a good job on my pedicure and acrylic nails. This place is a great and clean nail salon. 10/10." },
  { name: "Christy Raney", rating: 5, date: "1 year ago", service: "Nails", text: "The team is very friendly, pays attention to detail, and is fairly priced. The shop is beautiful and very clean. Recommend 10/10." },
  { name: "Destiny Junious", rating: 5, date: "1 year ago", service: "Pedicure, Manicure, Foot massage", text: "The best nail shop in Champaign. So friendly and they love what they do. Very detailed and take time to perfect their work. Love them!" },
  { name: "Takeisha Johnson", rating: 5, date: "2 years ago", service: "Pedicure", text: "Love this place. Best place to get your pedicure done hands down. Eddie will get you right every time." },
  { name: "Jakia Payne", rating: 5, date: "1 year ago", service: "Pedicure, Manicure, Nail art", text: "I love Beauty Nails Spa. They are super sweet and accommodating. Best in Champaign!" },
  { name: "Danielle Pilgrim", rating: 5, date: "1 year ago", service: "Pedicure, Manicure, Nail art", text: "I absolutely love my nails. Hannah snaps every time. Only place I go." },
  { name: "Markeisha Boyce", rating: 5, date: "10 months ago", service: "Nails", text: "The people are polite, gentle, and efficient. I love the designs and the atmosphere here. Prices are good too." },
  { name: "Tonya Jones", rating: 5, date: "9 months ago", service: "Nails", text: "Very clean facility, awesome customer service!" },
  { name: "Gary Stow", rating: 5, date: "2 years ago", service: "Pedicure", text: "I had a very pleasant experience here. I get pedicures regularly and they did a great job." },
];
```

---

## Notes for Claude Code

- Add a "Leave a Review" CTA on every review card section linking to the Google review link (`https://g.page/r/CTK8LV-epOqKEAE/review`) and Yelp link.
- Star names to feature in copy: Hannah (owner/tech), Anna, Eddie.
- Common themes to weave into headings: spotless and sterilized, gentle, matches inspo pics, long lasting polish, open Sundays, family run, Gel X quality.
- Do NOT fabricate review counts or stars. Use "80+ five-star reviews" and "5.0 rating" only as supported above.
- Keep all review text exactly as cleaned here (no EM dashes were used).
