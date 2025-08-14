require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const sampleBlogs = [
  {
    title: "Get instant and accurate diagnostic services Pathology tests at a super affordable cost from DrLaBike clinic.",
    content: "Our clinic provides comprehensive pathology testing services with state-of-the-art equipment and experienced technicians. We offer a wide range of tests including blood work, urine analysis, and specialized diagnostic procedures at competitive prices.",
    image: "/assets/checkup.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Trusted by 150,000+ Families, 80+ Cities, 290+ Expert Doctors, 150+ Advanced Clinics.",
    content: "IVF (in vitro fertilization) is a type of fertility treatment where eggs are combined with sperm outside of your body in a lab. It's a method used by people who need help achieving pregnancy. IVF involves many complex steps and is an effective form of assisted reproductive technology (ART).",
    image: "/assets/ivff.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "PCOD Diet Chart",
    content: "A PCOD Diet Chart plan includes meals rich in fiber, low glycemic, Antioxidant-Rich, Green Leafy, Lean proteins and healthy fats.",
    image: "/assets/pcod.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "After how many weeks IVF pregnancy is considered safe ?",
    content: "IVF pregnancy is considered safe after first trimester. Every trimester is a critical time to receive routine prenatal care.",
    image: "/assets/ivfsafe.png",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
title:"Understanding Surrogacy: Meaning, Process, and Key Considerations",
content:"Explore our surrogacy guide: Understand the process, costs, legal aspects, and debunk common myths to learn how surrogacy creates new families.",
image:"/assets/color.png",
createdAt: new Date(),
updatedAt: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    const insertedBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`Inserted ${insertedBlogs.length} blogs`);

    insertedBlogs.forEach(blog => {
      console.log(`- ${blog.title} (ID: ${blog._id})`);
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
