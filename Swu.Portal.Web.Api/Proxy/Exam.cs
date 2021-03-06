﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Swu.Portal.Web.Api.Proxy
{
    public class Exam
    {
        [JsonProperty(PropertyName = "title_en")]
        public string Title_EN { get; set; }
        [JsonProperty(PropertyName = "description_en")]
        public string Description_EN { get; set; }

        [JsonProperty(PropertyName = "title_th")]
        public string Title_TH { get; set; }
        [JsonProperty(PropertyName = "description_th")]
        public string Description_TH { get; set; }

        [JsonProperty(PropertyName = "examDate")]
        public DateTime ExamDate { get; set; }
    }
}
