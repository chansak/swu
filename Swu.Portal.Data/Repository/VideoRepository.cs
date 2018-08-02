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
    public class VideoRepository :IRepository<Video>
    {
        private SwuDBContext context;
        public VideoRepository()
        {
            this.context = new SwuDBContext();
        }
        public IEnumerable<Video> List
        {
            get
            {
                List<Video> data = new List<Video>();
                using (var context = new SwuDBContext())
                {
                    data = context.Videos
                        .Include(i => i.ApplicationUser)
                        .ToList();
                }
                return data;
            }
        }
        public void Add(Video entity)
        {
            this.context.Videos.Add(entity);
            this.context.SaveChanges();
        }
        public void Delete(Video entity)
        {
            this.context.Videos.Remove(entity);
            this.context.SaveChanges();
        }
        public void Update(Video entity)
        {
            this.context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            this.context.SaveChanges();

        }
        public Video FindById(int Id)
        {
            Video data = new Video();
                data = context.Videos
                    .Include(i => i.ApplicationUser)
                    .Where(i => i.Id == Id)
                    .FirstOrDefault();
            return data;
        }
    }
}
