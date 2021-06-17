module Swu {
    @Module("app")
    @Controller({ name: "HomeController" })
    export class HomeController {
        static $inject: Array<string> = ["$scope", "$rootScope", "$state", "AuthServices"];
        constructor(private $scope: ng.IScope, private $rootScope: IRootScope, private $state: ng.ui.IState, private auth: IAuthServices) {
            this.init();
        }
        init(): void {
            this.$rootScope.seo = {
                title: "The Joint Medical Programme - Srinakharinwirot University - The University of Nottingham",
                keywordEn: "Srinakharinwirot, SWU, Thai University, Public University, Government sponsored University, Comprehensive University, Higher Education, bachelor's, master's, doctoral, Ph.D., Admission, Bangkok, Ongkharak, Nakhon Nayok Province, Thailand",
                keywordTh: "มหาวิทยาลัย , มหาวิทยาลัยศรีนครินทรวิโรฒ , มศว,ศรีนครินทรวิโรฒ, มศว., วิจัย,  ปริญญาตรี, ปริญญาโท,ปริญญาเอก,รับนิสิตใหม่,องครักษ์,นครนายก,สาธิต",
                description: "Srinakharinwirot University is a government sponsored university located in Bangkok, Thailand.  It was established in 1949 as the Higher Teacher Training School at Prasarnmit and became the College of Education in 1953.  In 1974, the College of Education became a comprehensive university by a Royal Decree of His Majesty King Bhumibol Adulyadej, who graciously granted the new university the name of Srinakharinwirot (See-na-ka-rin-wee-rote), which means ‘the glory of the city.’  Currently, the University has 14 faculties and 12 research institutes and centers located in Prasarnmit Campus in central Bangkok and Ongkharak Campus in Nakhon Nayok Province."
            };
        };

    }
}