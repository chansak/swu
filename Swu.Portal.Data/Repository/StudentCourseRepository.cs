﻿using Swu.Portal.Data.Context;
using Swu.Portal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Swu.Portal.Data.Repository
{
    public interface IStudentCourseRepository : IRepository<StudentCourse>
    {
        List<StudentCourse> FindByCourseId(string Id);
    }
    public class StudentCourseRepository : IStudentCourseRepository
    {
        private SwuDBContext context;
        public StudentCourseRepository()
        {
            this.context = new SwuDBContext();
        }
        public IEnumerable<StudentCourse> List
        {
            get
            {
                return this.context.StudentCourse
                    .Include(i=>i.Student)
                    .AsEnumerable();
            }
        }
        public void Add(StudentCourse entity)
        {
            this.context.StudentCourse.Add(entity);
            this.context.SaveChanges();
        }
        public void Delete(StudentCourse entity)
        {
            this.context.StudentCourse.Remove(entity);
            this.context.SaveChanges();
        }
        public void Update(StudentCourse entity)
        {
            this.context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            this.context.SaveChanges();

        }
        public StudentCourse FindById(int Id)
        {
            var result = this.context.StudentCourse
                .Include(i => i.Student)
                .Where(i => i.Id == Id).FirstOrDefault();
            return result;
        }

        public List<StudentCourse> FindByCourseId(string Id)
        {
            List<StudentCourse> data = new List<StudentCourse>();
                data = context.StudentCourse
                    .Include(i => i.Student)
                    .Where(i => i.Course.Id == Id).ToList();
            return data;
        }
    }
}
