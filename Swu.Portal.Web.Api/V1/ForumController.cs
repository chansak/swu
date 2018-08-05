﻿using Newtonsoft.Json;
using Swu.Portal.Core.Dependencies;
using Swu.Portal.Data.Models;
using Swu.Portal.Data.Repository;
using Swu.Portal.Service;
using Swu.Portal.Web.Api.Proxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Swu.Portal.Web.Api.V1
{
    [RoutePrefix("V1/Forum")]
    public class ForumController : ApiController
    {
        private const string UPLOAD_DIR = "FileUpload/";
        private readonly IRepository2<Forum> _forumRepository;
        private readonly IRepository<ForumCategory> _forumCategoryRepository;
        private readonly IRepository<Comment> _commentRepository;
        private readonly IConfigurationRepository _configurationRepository;
        private readonly ICommentService _commentService;
        private readonly IDateTimeRepository _datetimeRepository;
        private readonly IForumService _forumService;
        public ForumController(
            IRepository2<Forum> forumRepository,
            IRepository<ForumCategory> forumCategoryRepository,
            IRepository<Comment> commentRepository,
            IConfigurationRepository configurationRepository,
            ICommentService commentService,
            IDateTimeRepository datetimeRepository,
            IForumService forumService)
        {
            this._forumRepository = forumRepository;
            this._forumCategoryRepository = forumCategoryRepository;
            this._commentRepository = commentRepository;
            this._configurationRepository = configurationRepository;
            this._commentService = commentService;
            this._datetimeRepository = datetimeRepository;
            this._forumService = forumService;
        }
        [HttpGet, Route("allItems")]
        public List<WebboardItemProxy> GetAllItems(string keyword)
        {
            try
            {
                var webboardItems = new List<WebboardItemProxy>();
                var forums = new List<Forum>();
                if (keyword.Equals("*"))
                {
                    forums = this._forumRepository.List.ToList();
                }
                else
                {
                    forums = this._forumRepository.List.Where(i => i.Name.ToLower().Contains(keyword.ToLower())).ToList();
                }
                foreach (var f in forums)
                {
                    webboardItems.Add(new WebboardItemProxy(f, this._configurationRepository.DefaultUserImage));
                }
                return webboardItems;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
        [HttpGet, Route("category")]
        public List<WebboardCategoryProxy> GetCategory()
        {
            var webboardCategories = new List<WebboardCategoryProxy>();
            var catgories = this._forumCategoryRepository.List.ToList();
            foreach (var c in catgories)
            {
                webboardCategories.Add(new WebboardCategoryProxy(c));
            }
            return webboardCategories;
        }
        [HttpGet, Route("getForumDetail")]
        public ForumDetailProxy GetForumDetail(string id)
        {
            var forum = this._forumRepository.FindById(id);
            var comments = this._commentRepository.List.Where(i => i.ForumId == id)
                .Select(c => new CommentProxy(c)).OrderByDescending(o => o.CreatedDate).ToList();
            return new ForumDetailProxy
            {
                Forum = new ForumProxy
                {
                    Id = forum.Id,
                    Name = forum.Name,
                    ShortDescription = forum.ShortDescription,
                    FullDescription = forum.FullDescription,
                    ImageUrl = forum.ImageUrl,
                    NumberOfViews = comments.Count(),
                    Price = forum.Price,
                    CreatedUserId = forum.ApplicationUser.Id,
                    CreatorName = forum.ApplicationUser.FirstName_EN + " " + forum.ApplicationUser.LastName_EN,
                    CreatedDate = forum.CreatedDate,
                    CreatorImageUrl = forum.ApplicationUser.ImageUrl
                },
                Comments = comments
            };
        }
        [HttpPost, Route("postComment")]
        public async Task<HttpResponseMessage> PostComment()
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }
                string root = HttpContext.Current.Server.MapPath("~/" + UPLOAD_DIR);
                var provider = new MultipartFormDataStreamProvider(root);
                var forumId = string.Empty;
                var userId = string.Empty;
                var comment = string.Empty;
                await Request.Content.ReadAsMultipartAsync(provider);
                CourseDetailProxy course = new CourseDetailProxy();
                foreach (var key in provider.FormData)
                {
                    if (key.Equals("forumId"))
                    {
                        forumId = JsonConvert.DeserializeObject<string>(provider.FormData[key.ToString()]);
                    }
                    if (key.Equals("userId"))
                    {
                        userId = JsonConvert.DeserializeObject<string>(provider.FormData[key.ToString()]);
                    }
                    if (key.Equals("comment"))
                    {
                        comment = JsonConvert.DeserializeObject<string>(provider.FormData[key.ToString()]);
                    }
                }
                var forum = this._forumRepository.FindById(forumId);
                this._commentService.Post(new Comment
                {
                    Description = comment,
                    ForumId = forumId,
                    CreatedDate = this._datetimeRepository.Now()
                }, userId);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

        }
        [HttpPost, Route("updateComment")]
        public HttpResponseMessage UpdateComment(CommentProxy comment)
        {
            try
            {
                var c = this._commentRepository.FindById(comment.Id);
                c.Description = comment.Description;
                c.UpdatedDate = this._datetimeRepository.Now();
                this._commentRepository.Update(c);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        [HttpPost, Route("addOrUpdatePost")]
        public void AddOrUpdatePost(WebboardItemProxy forum)
        {
            if (string.IsNullOrWhiteSpace(forum.Id))
            {
                this._forumService.CreateNewPost(new Forum
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = forum.Name,
                    ShortDescription = forum.ShortDescription,
                    FullDescription = forum.FullDescription,
                    CategoryId = forum.CategoryId,
                    CreatedDate = this._datetimeRepository.Now()
                }, forum.UserId);
            }
            else
            {
                this._forumService.UpdatePost(new Forum
                {
                    Id = forum.Id,
                    Name = forum.Name,
                    ShortDescription = forum.ShortDescription,
                    FullDescription = forum.FullDescription,
                    CategoryId = forum.CategoryId,
                    UpdatedDate = this._datetimeRepository.Now()
                }, forum.UserId);
            }

        }
        [HttpGet, Route("getPostById")]
        public WebboardItemProxy GetPostById(string id)
        {
            var forum = this._forumRepository.FindById(id);
            return new WebboardItemProxy(forum, this._configurationRepository.DefaultUserImage);
        }
        [HttpGet, Route("getCommentById")]
        public CommentProxy GetCommentById(int id)
        {
            var comment = this._commentRepository.FindById(id);
            return new CommentProxy(comment);
        }
        [HttpPost, Route("addNewCategory")]
        public HttpResponseMessage AddNewCategory(WebboardCategoryProxy category)
        {
            try
            {
                this._forumCategoryRepository.Add(new ForumCategory
                {
                    Title_TH = category.Title_TH,
                    Title_EN = category.Title_EN
                });
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        [HttpPost, Route("addNewOrUpdateCategory")]
        public HttpResponseMessage AddNewOrUpdateCategory(WebboardCategoryProxy category)
        {
            try
            {
                if (category.Id == 0)
                {
                    this._forumCategoryRepository.Add(new ForumCategory
                    {
                        Title_TH = category.Title_TH,
                        Title_EN = category.Title_EN
                    });
                }
                else
                {
                    var c = this._forumCategoryRepository.FindById(category.Id);
                    c.Title_TH = category.Title_TH;
                    c.Title_EN = category.Title_EN;
                    this._forumCategoryRepository.Update(c);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        [HttpGet, Route("getCategoryById")]
        public WebboardCategoryProxy GetCategoryById(int id)
        {
            var c = this._forumCategoryRepository.FindById(id);
            return new WebboardCategoryProxy(c);
        }
        [HttpGet, Route("deleteCategoryById")]
        public HttpResponseMessage DeleteCategoryById(int id)
        {
            try
            {
                var c = this._forumCategoryRepository.FindById(id);
                this._forumCategoryRepository.Delete(c);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        [HttpGet, Route("removeForumById")]
        public HttpResponseMessage RemoveForumById(string id)
        {
            var forum = this._forumRepository.FindById(id);
            this._forumRepository.Delete(forum);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
