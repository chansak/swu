﻿using Swu.Portal.Data.Context;
using Swu.Portal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Swu.Portal.Core.Dependencies;

namespace Swu.Portal.Data.Repository
{
    public class CourseRepository : IRepository2<Course>
    {
        private SwuDBContext context;
        private readonly IConfigurationRepository _configRepository;
        public CourseRepository(IConfigurationRepository configRepository)
        {
            this._configRepository = configRepository;
            this.context = new SwuDBContext();
        }
        public IEnumerable<Course> List
        {
            get
            {
                List<Course> data = new List<Course>();
                data = context.Courses
                    .Include(i => i.Category)
                        .Include(i => i.Curriculums)
                        .Include(i => i.Students)
                        .Include(i => i.Teachers)
                        .Include(i => i.PhotoAlbums)
                        .Include(i => i.ApplicationUser)
                    .Where(i => i.Id != _configRepository.dummyCourse)
                    .ToList();
                return data;
            }
        }
        public void Add(Course entity)
        {
            this.context.Courses.Add(entity);
            this.context.SaveChanges();
        }
        public void Delete(Course entity)
        {
            this.context.Courses.Remove(entity);
            this.context.SaveChanges();
        }
        public void Update(Course entity)
        {
            this.context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            this.context.SaveChanges();
        }
        public Course FindById(string Id)
        {
            Course data = new Course();
            data = this.context.Courses
                .Include(i => i.Category)
                    .Include(i => i.Curriculums)
                    .Include(i => i.Students)
                    .Include(i => i.Teachers)
                    .Include(i => i.PhotoAlbums)
                    .Include(i => i.ApplicationUser)
                .Where(i => i.Id == Id)
                .FirstOrDefault();
            return data;
        }
    }
}
