using System.Data.Entity.Migrations;
using Swu.Portal.Data.Context;
using Swu.Portal.Data.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using System;
using System.Web.Security;

namespace Swu.Portal.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<Swu.Portal.Data.Context.SwuDBContext>
    {
        private const string CID1 = "2e172c30-ba70-4036-b609-91ecabbad3b7";
        private const string CID2 = "518263c4-888d-48bc-b924-d2ccf9eb9937";
        private const string CID3 = "6a7040c9-ac77-4c5b-bb51-4e830eced91f";
        private const string CID4 = "a6533489-8ebe-45eb-ac86-b9c2a12840a5";
        private const string CID5 = "ce4bcf32-41af-49bb-9183-a815780eebfd";
        private const string CID6 = "d5429b19-de51-48f9-bd43-2b2060789a4d";
        private const string CID7 = "e1b8d39e-333b-4af8-9c92-f744427bf3b5";
        private const string CID8 = "f0e86e6e-a1f7-45ee-961b-6addae78a5fe";
        private const string CID9 = "f8d9a209-fe7c-49c0-9c2b-4993d37bdf35";
        private const string PID1 = "a8d9a209-fe7c-49c0-9c2b-4993d37bdf35";

        private const string FID1 = "2e172c30-ba70-4036-b609-91ecabbad3b7";
        private const string FID2 = "518263c4-888d-48bc-b924-d2ccf9eb9937";
        private const string FID3 = "6a7040c9-ac77-4c5b-bb51-4e830eced91f";
        private const string FID4 = "a6533489-8ebe-45eb-ac86-b9c2a12840a5";

        private const string RID3 = "6a7040c9-ac77-4c5b-bb51-4e830eced91f";
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }
        protected override void Seed(SwuDBContext context)
        {
            this.InitialDatabase(context);
            base.Seed(context);
        }
        private void InitialDatabase(SwuDBContext context)
        {
            var categories = new List<CourseCategory>();
            var courses = new List<Course>();
            var curriculums = new List<Curriculum>();
            var teachers = new List<Teacher>();
            var students = new List<Student>();
            var photos = new List<Photo>();
            var fcategories = new List<ForumCategory>();
            var forums = new List<Forum>();
            var comments = new List<Comment>();
            var rcategories = new List<ResearchCategory>();
            var researchs = new List<Research>();
            #region User
            //var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new SwuDBContext()));
            var defaultUser = new ApplicationUser
            {
                UserName = "chansak",
                FirstName = "chansak",
                LastName = "kochasen"
            };
            //manager.Create(defaultUser, "password");
            #endregion


            #region Curriculum
            var cur1 = new Curriculum
            {
                Name = "Lecture 1.1 Practical language work",
                Type = CurriculumType.Lecture,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            var cur2 = new Curriculum
            {
                Name = "Lecture 1.2 Study of important works and/or topics",
                Type = CurriculumType.Lecture,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            var cur3 = new Curriculum
            {
                Name = "Lecture 1.3 Literature of the language",
                Type = CurriculumType.Lecture,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            var cur4 = new Curriculum
            {
                Name = "Quizzes History of the language test",
                Type = CurriculumType.Quize,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            var cur5 = new Curriculum
            {
                Name = "Lecture 1.4 General linguistics",
                Type = CurriculumType.Lecture,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            var cur6 = new Curriculum
            {
                Name = "Lecture 1.5 Phonetics and phonology ",
                Type = CurriculumType.Lecture,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            var cur7 = new Curriculum
            {
                Name = "Lecture 1.6 Grammatical analysis",
                Type = CurriculumType.Lecture,
                CourseId = CID1,
                NumberOfTime = 2,
                ApplicationUser = defaultUser
            };
            curriculums.Add(cur1);
            curriculums.Add(cur2);
            curriculums.Add(cur3);
            curriculums.Add(cur4);
            curriculums.Add(cur5);
            curriculums.Add(cur6);
            curriculums.Add(cur7);
            #endregion

            #region Teacher
            var t1 = new Teacher
            {
                Name = "Annie Thornburg",
                Description = "Your week�s work will include a tutorial on linguistics and one on literature, in or arranged by your college, a linguistics class and language classes on different skills relating to the language or languages you study, and five or six lectures.",
                ImageUrl = "Content/images/courses/s4.png",
                Position = "History of Arts Teacher",
                ApplicationUser = defaultUser
            };
            var t2 = new Teacher
            {
                Name = "Miguel M. Ball",
                ImageUrl = "Content/images/team/tsm2.png",
                Position = "Physics and Philosophy Teacher",
                Description = "Your week�s work will include a tutorial on linguistics and one on literature, in or arranged by your college, a linguistics class and language classes on different skills relating to the language or languages you study, and five or six lectures.",
                ApplicationUser = defaultUser
            };
            teachers.Add(t1);
            teachers.Add(t2);
            #endregion

            #region Student
            var s1 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s2 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s3 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s4 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s5 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s6 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s7 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s8 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s9 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s10 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s11 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s12 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s13 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s14 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s15 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s16 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s17 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s18 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s19 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            var s20 = new Student
            {
                Name = "Chansak Kochasen",
                StudentId = "12345678",
                ApplicationUser = defaultUser
            };
            students.Add(s1);
            students.Add(s2);
            students.Add(s3);
            students.Add(s4);
            students.Add(s5);
            students.Add(s6);
            students.Add(s7);
            students.Add(s8);
            students.Add(s9);
            students.Add(s10);
            students.Add(s11);
            students.Add(s12);
            students.Add(s13);
            students.Add(s14);
            students.Add(s15);
            students.Add(s16);
            students.Add(s17);
            students.Add(s18);
            students.Add(s19);
            students.Add(s20);
            #endregion

            #region Course Category
            var cat1 = new CourseCategory
            {
                Title = "��鹻� 1",
                ApplicationUser = defaultUser
            };
            var cat2 = new CourseCategory
            {
                Title = "��鹻� 2",
                ApplicationUser = defaultUser
            };
            var cat3 = new CourseCategory
            {
                Title = "��鹻� 3",
                ApplicationUser = defaultUser
            };
            var cat4 = new CourseCategory
            {
                Title = "��鹻� 4",
                ApplicationUser = defaultUser
            };
            var cat5 = new CourseCategory
            {
                Title = "��鹻� 5",
                ApplicationUser = defaultUser
            };
            categories.Add(cat1);
            categories.Add(cat2);
            categories.Add(cat3);
            categories.Add(cat4);
            categories.Add(cat5);
            #endregion

            #region Course
            var c1 = new Course
            {
                Id = CID1,
                Name_TH = "A11BHS Behavioural Sciences",
                Name_EN = "A11BHS Behavioural Sciences",
                ImageUrl = "Content/images/courses/1.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat1,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c2 = new Course
            {
                Id = CID2,
                Name_TH = "A11EXT Structure, function and pharmacology of ExcitableTissues",
                Name_EN = "A11EXT Structure, function and pharmacology of ExcitableTissues",
                ImageUrl = "Content/images/courses/2.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat1,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c3 = new Course
            {
                Id = CID3,
                Name_TH = "A11HDT Human Development and Tissue Differentiation",
                Name_EN = "A11HDT Human Development and Tissue Differentiation",
                ImageUrl = "Content/images/courses/13.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat1,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c4 = new Course
            {
                Id = CID4,
                Name_TH = "A11MBM Molecular Basis of Medicine",
                Name_EN = "A11MBM Molecular Basis of Medicine",
                ImageUrl = "Content/images/courses/4.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat2,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c5 = new Course
            {
                Id = CID5,
                Name_TH = "A11CS1 Communication Skills (I)",
                Name_EN = "A11CS1 Communication Skills (I)",
                ImageUrl = "Content/images/courses/5.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat2,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c6 = new Course
            {
                Id = CID6,
                Name_TH = "A11CLS Clinical Laboratory Sciences (I)",
                Name_EN = "A11CLS Clinical Laboratory Sciences (I)",
                ImageUrl = "Content/images/courses/6.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat2,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c7 = new Course
            {
                Id = CID7,
                Name_TH = "A11CRH Cardiovascular, Respiratory and Haematology",
                Name_EN = "A11CRH Cardiovascular, Respiratory and Haematology",
                ImageUrl = "Content/images/courses/7.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat3,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c8 = new Course
            {
                Id = CID8,
                Name_TH = "A11SF1 Human Development Structure and Function (I)",
                Name_EN = "A11SF1 Human Development Structure and Function (I)",
                ImageUrl = "Content/images/courses/8.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat3,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            var c9 = new Course
            {
                Id = CID9,
                Name_TH = "A11PD1 Early Clinical and Professional Development (I)",
                Name_EN = "A11PD1 Early Clinical and Professional Development (I)",
                ImageUrl = "Content/images/courses/11.jpg",
                BigImageUrl = "Content/images/courses/cd1.jpg",
                Price = 12,
                Language = "English",
                FullDescription = @"<p>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <p class='irs-mrgntp-thrty'>In your study of Linguistics, you will be introduced to the analysis of the nature and structure of human language (including topics such as how words and sentences are formed.</p>
                                                    <ul class='list-unstyled irs-cdtls-spara'>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Teach part time without interrupting your full-time career</li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Know you�re making a difference sharing your wisdom with students </li>
                                                        <li><span class='text-thm2 flaticon-correct-symbol'> </span>Connect with all of your students - in a classroom or online - with our smaller class sizes</li>
                                                    </ul>",
                Category = cat3,
                Teachers = new List<Teacher> {
                    t1,t2
                },
                Students = new List<Student> {
                    s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15,s16,s17,s18,s19,s20,
                },
                ApplicationUser = defaultUser
            };
            courses.Add(c1);
            courses.Add(c2);
            courses.Add(c3);
            courses.Add(c4);
            courses.Add(c5);
            courses.Add(c6);
            courses.Add(c7);
            courses.Add(c8);
            courses.Add(c9);
            #endregion

            #region PhotoAlbum
            var album = new PhotoAlbum
            {
                Id = PID1,
                Name = "default album",
                CourseId = CID1,
                ApplicationUser = defaultUser
            };
            var p1 = new Photo
            {
                PhotoAlbumId = PID1,
                Name = "1.jpg",
                ImageUrl = "Content/images/courses/2e172c30-ba70-4036-b609-91ecabbad3b7/1.jpg",
                PublishedDate = new DateTime(2017, 8, 7),
                UploadBy = "chansak",
                ApplicationUser = defaultUser
            };
            photos.Add(p1);
            #endregion

            #region Forum Category
            var fcat1 = new ForumCategory
            {
                Title = "���ǻ�С��",
                ApplicationUser = defaultUser
            };
            var fcat2 = new ForumCategory
            {
                Title = "����ͺ",
                ApplicationUser = defaultUser
            };
            var fcat3 = new ForumCategory
            {
                Title = "��Ҥ���������",
                ApplicationUser = defaultUser
            };
            var fcat4 = new ForumCategory
            {
                Title = "�����",
                ApplicationUser = defaultUser
            };
            fcategories.Add(fcat1);
            fcategories.Add(fcat2);
            fcategories.Add(fcat3);
            fcategories.Add(fcat3);
            #endregion

            #region Forum
            var f1 = new Forum
            {
                Id = FID1,
                Category = fcat1,
                Name = "��зѹ�ᾷ���ʵ�� ��� ��͹�Ѻ���Ե�š����¹ ��зѹ�ᾷ�� �ҡ TMDU",
                ShortDescription = "��зѹ�ᾷ���ʵ�� ����Է�������չ��Թ�����ò (���) ��͹�Ѻ���Ե�š����¹ ��зѹ�ᾷ�� �ҡ TMDU( Tokyo Medical and Dental University) ����ȭ���� �¾ҹ��Ե�š����¹��������ʶҹ����Ӥѭ�����Է����� ��к������š����¹���ʺ��ó��èѴ������¹����͹����к��آ�Ҿ㹻������ �����Ե�š����¹��� 9 �� ������ѹ��� 28 �ԧ�Ҥ� 2560",
                FullDescription = @"<p>However, the aspect of citizenship that Dr Schlissel wants to address is that of understanding how to accumulate and assess information. During my freshman year, I was looking for ways to get involved on campus. As it is currently the midst of finals season here in Cambridge, many here on campus can�t help but think about their Winter Break plans. </p>
<p> Known as J - Term on campus,
                Harvard�s Winter Break lasts for over a month.Depending on your final exam schedules in December, one�s winter break can last from early-to - mid December to late January. With over a month of break in between Fall and Spring Semesters, may Harvard students opt to take the time to do a variety of things: spend time with family, travel abroad, volunteer, work, prepare for graduate school exams, etc. </p>
<p> Freshman year J - term and this upcoming J - term I plan to stay home for the majority of it to rest and spend time with my family in Los Angeles.A fellow Harvard program attendee and I co - wrote a piece for Vice News Latin America about American expats that live in Mexico and how their experiences in Mexico had informed their thoughts on the upcoming presidential election.The link to the article can be found below: </p>
<p>< a class='irs-active-link text-thm2' href='#'>https://news.vice.com/article/wed-be-on-the-other-side-of-the-wall-us-ex�</a></p>
<p>Not only was this experience a remarkable opportunity to immerse myself in a new country, but it gave me a supportive network of friends and programming that made that adjustment in a new country all the more enjoyable.</p>
<p class='irs-mrgntop-ffty'>It kinda stinks getting deferred because no one likes waiting, but there�s still hope.Just because you got deferred doesn�t mean that you can�t get accepted later.Me and my roommate both got deferred and then got in during regular decision.So, don�t freak out. You�re still rockin�! </p>
<p class='irs-mrgntop-ffty'>There�s nothing like a nice relaxing cup of tea, says my grandma, and she�s been around on this green and blue planet for 88 years so I trust her.Take some time to gather yourself and chill out. Everything�s A-okay.The sky is still above your head probably/hopefully, and you will eventually go to college next year. </p>",
                ImageUrl = "Content/images/courses/1.jpg",
                ApplicationUser = defaultUser
            };
//            var f2 = new Forum
//            {
//                Id = FID2,
//                Category = fcat1,
//                Name = "�Դ��ҹ��Ż����� ��� ��鹷ҧ����Ҫվ���ҧ�ѹ��ͧ� �.���� ����繨�ԧ",
//                ShortDescription = "�����Ż������ʵ�� ����Է�������չ��Թ�����ò (���) �Ѻ���ա˹�觤�ТͧʶҺѹ����֡���ش��֡�ҷ���繷�����¹�����ѹ�ͧ��ͧ� �ѡ���¹ �.���� �������������ŻԹ�ѡ�ʴ��������㹻Ѩ�غѹ�ӹǹ�����·�診�ҡ���� ��� �� ��������� �Ե���Ѳ�� / �իչ ��ʸ���ó� / �չ �ѳ��ҳѪ / ���� KPN / �ͻ���� ���ʵ��� �繵� ����ش�����Ż������ʵ�� ��� �֧��Ѵ�Ԩ�����Դ��ҹ��Ż������ʵ�� ��� �й���ѡ�ٵþ��������蹾�����������ҡ��������ö�������ٴ��� ���ҧ�ç�ѹ�������Ѻ��ͧ� ����ҹѡ���¹ �.���� �����ҡ��������¹�����觹����§ҹ �FOFA SWU : Open House 2017� ���ǡ�����������ͺ�����к� TCAS 㹻� 2561 ��觡����Ѻ����ʹ㨨ҡ��ͧ� �ѡ���¹���㹡�ا෾� ����Ҩҡ��ҧ�ѧ��Ѵ�ҡ���� 600 �� � �Ҥ�ù�ѵ���� ��ʵ�Ҩ���� ��.���ê ������ ��� ����ҹ�Ե� �آ���Է 23",
//                FullDescription = @"<p>However, the aspect of citizenship that Dr Schlissel wants to address is that of understanding how to accumulate and assess information. During my freshman year, I was looking for ways to get involved on campus. As it is currently the midst of finals season here in Cambridge, many here on campus can�t help but think about their Winter Break plans. </p>
//<p> Known as J - Term on campus,
//                Harvard�s Winter Break lasts for over a month.Depending on your final exam schedules in December, one�s winter break can last from early-to - mid December to late January. With over a month of break in between Fall and Spring Semesters, may Harvard students opt to take the time to do a variety of things: spend time with family, travel abroad, volunteer, work, prepare for graduate school exams, etc. </p>
//<p> Freshman year J - term and this upcoming J - term I plan to stay home for the majority of it to rest and spend time with my family in Los Angeles.A fellow Harvard program attendee and I co - wrote a piece for Vice News Latin America about American expats that live in Mexico and how their experiences in Mexico had informed their thoughts on the upcoming presidential election.The link to the article can be found below: </p>
//<p>< a class='irs-active-link text-thm2' href='#'>https://news.vice.com/article/wed-be-on-the-other-side-of-the-wall-us-ex�</a></p>
//<p>Not only was this experience a remarkable opportunity to immerse myself in a new country, but it gave me a supportive network of friends and programming that made that adjustment in a new country all the more enjoyable.</p>
//<p class='irs-mrgntop-ffty'>It kinda stinks getting deferred because no one likes waiting, but there�s still hope.Just because you got deferred doesn�t mean that you can�t get accepted later.Me and my roommate both got deferred and then got in during regular decision.So, don�t freak out. You�re still rockin�! </p>
//<p class='irs-mrgntop-ffty'>There�s nothing like a nice relaxing cup of tea, says my grandma, and she�s been around on this green and blue planet for 88 years so I trust her.Take some time to gather yourself and chill out. Everything�s A-okay.The sky is still above your head probably/hopefully, and you will eventually go to college next year. </p>",
//                ImageUrl = "Content/images/courses/1.jpg",
//                //ApplicationUser = defaultUser
//            };
//            var f3 = new Forum
//            {
//                Id = FID3,
//                Category = fcat1,
//                Name = "���Ե �Ң��Ԫ��Է����ʵ������ ����Է����ʵ�� ��� ������Ѻ",
//                ShortDescription = "����Է�������չ��Թ�����ò (���) ���ʴ������Թ�աѺ ��.��.����ѡ��� ���͡��� ��й��Ե��ѡ�ٵá���֡�Һѳ�Ե �Ң��Ԫ��Է����ʵ������ ����Է����ʵ�� ���� ������ص�� �ʧ�آ �ҧ��ǾԳ�Ԫ� �����ҹ� ��¹�ҸԻ �������� ����ҹء� ������ �ҧ��ǻѷ�Ҿ� ��Ҵ� �ҧ������Թ�� ����� ��йҧ�����ʹ� ���� ������Ѻ �ҧ����ͧ��������ѹ�Ѻ˹�� �ҡ������������СǴ�ŧҹ������ ��ѵ���� �ҡ�ŧҹ �ش�Ԩ�����Է����ʵ�� ����ͧ 9 �Ԩ�����Է����ʵ�����Ƿҧ����Ҫ���� � ��û�Ъ���Ԫҡ���Ԩ����й�ѵ�������ҧ��ä���駷�� 4 ��С�û�Ъ���������Ԫҡ���дѺ�ҹҪҵ� ��ҹ��ѧ�ҹ俿���ç�٧ ������������ù�⹺Ѻ�������Ѻ�ɵá���С�û��������٧ ���駷�� 2 �Ѵ�� ����Է�����෤������Ҫ������ҹ�� �����ҧ�ѹ��� 26 - 27 �á�Ҥ� 2560 � �ٹ���Ъ���ҹҪҵ� �ç�����§�����ù����� �ѧ��Ѵ��§����",
//                FullDescription = @"<p>However, the aspect of citizenship that Dr Schlissel wants to address is that of understanding how to accumulate and assess information. During my freshman year, I was looking for ways to get involved on campus. As it is currently the midst of finals season here in Cambridge, many here on campus can�t help but think about their Winter Break plans. </p>
//<p> Known as J - Term on campus,
//                Harvard�s Winter Break lasts for over a month.Depending on your final exam schedules in December, one�s winter break can last from early-to - mid December to late January. With over a month of break in between Fall and Spring Semesters, may Harvard students opt to take the time to do a variety of things: spend time with family, travel abroad, volunteer, work, prepare for graduate school exams, etc. </p>
//<p> Freshman year J - term and this upcoming J - term I plan to stay home for the majority of it to rest and spend time with my family in Los Angeles.A fellow Harvard program attendee and I co - wrote a piece for Vice News Latin America about American expats that live in Mexico and how their experiences in Mexico had informed their thoughts on the upcoming presidential election.The link to the article can be found below: </p>
//<p>< a class='irs-active-link text-thm2' href='#'>https://news.vice.com/article/wed-be-on-the-other-side-of-the-wall-us-ex�</a></p>
//<p>Not only was this experience a remarkable opportunity to immerse myself in a new country, but it gave me a supportive network of friends and programming that made that adjustment in a new country all the more enjoyable.</p>
//<p class='irs-mrgntop-ffty'>It kinda stinks getting deferred because no one likes waiting, but there�s still hope.Just because you got deferred doesn�t mean that you can�t get accepted later.Me and my roommate both got deferred and then got in during regular decision.So, don�t freak out. You�re still rockin�! </p>
//<p class='irs-mrgntop-ffty'>There�s nothing like a nice relaxing cup of tea, says my grandma, and she�s been around on this green and blue planet for 88 years so I trust her.Take some time to gather yourself and chill out. Everything�s A-okay.The sky is still above your head probably/hopefully, and you will eventually go to college next year. </p>",
//                ImageUrl = "Content/images/courses/1.jpg",
//                //ApplicationUser = defaultUser
//            };
            forums.Add(f1);
            //forums.Add(f2);
            //forums.Add(f3);
            #endregion

            #region Comment
            var com1 = new Comment
            {
                Description = "Your week�s work will include a tutorial on linguistics and one on literature, in or arranged by your college, a linguistics class and language classes on different skills relating to the language or languages you study, and five or six lectures.",
                Forum = f1,
                ApplicationUser = defaultUser
            };
            var com2 = new Comment
            {
                Description = "Your week�s work will include a tutorial on linguistics and one on literature, in or arranged by your college, a linguistics class and language classes on different skills relating to the language or languages you study, and five or six lectures.",
                Forum = f1,
                ApplicationUser = defaultUser
            };
            var com3 = new Comment
            {
                Description = "Your week�s work will include a tutorial on linguistics and one on literature, in or arranged by your college, a linguistics class and language classes on different skills relating to the language or languages you study, and five or six lectures.",
                Forum = f1,
                ApplicationUser = defaultUser
            };
            comments.Add(com1);
            comments.Add(com2);
            comments.Add(com3);
            #endregion

            #region Research Category
            var rcat1 = new ResearchCategory
            {
                Title = "��ع��",
                ApplicationUser = defaultUser
            };
            var rcat2 = new ResearchCategory
            {
                Title = "�ԹԨ����ä",
                ApplicationUser = defaultUser
            };
            rcategories.Add(rcat1);
            rcategories.Add(rcat2);
            #endregion

            #region Research
            var r1 = new Research
            {
                Id = FID1,
                Category = rcat1,
                Name_TH = "Yellow Head Virus - YHV",
                Name_EN = "Yellow Head Virus - YHV",
                ShortDescription = "��äѴ���͡�ת��ع�÷���ʴ�ķ����ҹ����� (Yellow Head Virus - YHV) 㹡�駡��Ҵ�",
                ImageUrl = "Content/images/courses/1.jpg",
                ApplicationUser = defaultUser
            };
            researchs.Add(r1);
            #endregion
            context.CourseCategory.AddRange(categories);
            context.SaveChanges();

            context.Teachers.AddRange(teachers);
            context.SaveChanges();

            context.Students.AddRange(students);
            context.SaveChanges();

            context.Courses.AddRange(courses);
            context.SaveChanges();

            context.Curriculums.AddRange(curriculums);
            context.SaveChanges();

            context.PhotoAlbums.Add(album);
            context.SaveChanges();

            context.Photos.AddRange(photos);
            context.SaveChanges();

            context.ForumCategory.AddRange(fcategories);
            context.SaveChanges();

            context.Forums.AddRange(forums);
            context.SaveChanges();

            context.Comments.AddRange(comments);
            context.SaveChanges();

            context.ResearchCategory.AddRange(rcategories);
            context.SaveChanges();

            context.Research.AddRange(researchs);
            context.SaveChanges();
        }
    }
}
