using Newtonsoft.Json;
using Swu.Portal.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Swu.Portal.Web.Api.Proxy
{
    public class WebboardCategoryProxy
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "title_th")]
        public string Title_TH { get; set; }
        [JsonProperty(PropertyName = "title_en")]
        public string Title_EN { get; set; }
        public WebboardCategoryProxy()
        {

        }
        public WebboardCategoryProxy(CourseCategory c)
        {
            this.Id = c.Id;
            this.Title_TH = c.Title_TH;
            this.Title_EN = c.Title_EN;
        }
        public WebboardCategoryProxy(ForumCategory f)
        {
            this.Id = f.Id;
            this.Title_TH = f.Title_TH;
            this.Title_EN = f.Title_EN;
        }
        public WebboardCategoryProxy(ResearchCategory r)
        {
            this.Id = r.Id;
            this.Title_TH = r.Title_TH;
            this.Title_EN = r.Title_EN;
        }
    }
}
