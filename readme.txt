一、萌咖天天作业需求

A、老师端
老师：布置作业和管理作业的功能
老师布置作业
    <1>、上传图片的需求
    <2>、上传语音的需求
老师管理作业
    <1>、对自己布置的作业可以编辑（比如添加新的语音、添加图片、修改作业标题等等）
    <2>、对自己布置的作业可以删除


B、学生端
学生：提交作业和编辑作业的功能
学生提交作业：
    <1>、上传语音的需求
    <2>、上传图片的需求

学生编辑作业：
    <1>、对自己的提交的作业可以编辑比如添加新的语音、添加图片、提交作业内容的修改等等）
    <2>、对自己的提交的作业可以删除

C、行为
老师和学生：点赞、评论的功能
     <1>、每个人都可以进行点赞操作。
          每个人都可以对自己的点赞行为进行取消操作。
     <2>、每个人都有评论的权利。评论的次数不受限制。
          每个人可以对自己的评论进行删除
     <3>、老师可以对任何人的评论进行删除


d、作业卡功效

<1>、老师布置一次作业、就生成一个作业卡。作业卡和作业是一一对应的关系。
<2>、作业卡可以被分享出去
<3>、学生通过作业卡可以做作业，然后提交自己的作业。
<4>、作业卡只能通过作业管理列表获得。以及初次布置作业生成得到。


二、萌咖天天作业页面分析。
A、taskContent界面梳理
有四个入口进入taskContent界面，分别是：老师布置作业、老师编辑作业、学生交作业、学生编辑作业。

通过传入的参数type分别进行逻辑处理。

主要的功能是：图片处理、语音处理、taskContent处理
相关接口有6个：dloadVoice,dloadImg,getVoiceByServerId,getImgByServerId,taskSubject_dloadVoice,taskSubject_dloadImg

编辑作业（老师、学生）会从父页面传递一个（taskSubjectId、taskFinishedId），图片处理、语音处理需要根据这个id进行上传等相应操作。
而老师布置作业、学生交作业需要自动生成一个id，进行图片处理、语音处理等操作。

task相关操作要通过redux(对id以及)进行数据控制，把id上传给父页面，父页面进行saveTask以及updateTask操作。（对于这个id，saveTask是一个负值，而upDateTask是一个正值);

B、setTaskPage界面梳理

界面入口有两个：布置作业入口、编辑作业入口。

通过redux接受子页面的（id以及输入内容）。

通过不同的界面入口，给子页面传递不同的内容。

C、作业卡页面梳理。（两个入口，必须获得taskSubjectId）。

三、萌咖天天作业接口逻辑问题
saveTaskFinished
saveTaskSubject
dloadImg
dloadVoice
task_dloadImg
task_dloadVoice
getVoiceByServerId
getImgByServerId

taskCentent页面，生成初始负值id。
有四个入口。老师布置作业，老师编辑作业，学生提交作业，学生编辑作业。

老师编辑作业+学生编辑作业。把这个负值id进行赋值，分别是taskSubjectId、taskFinishedId。

所以可以理解为id的值可能有正值（编辑作业的情况）；可能有负值（学生提交作业和老师布置作业情况）。

id的用处是=====在调用dloadImg、dloadVoice、task_dloadImg、task_dloadVoice传入。
其中=====dloadImg和dloadVoce是和taskFinishedId相关。（传入的值都是id，但是在接口中相当于taskFinishedId）;
其中=====task_dloadImg和task_dloadVoice是和taskSubjectId相关。（传入的都是id，但是在接口中代表taskSubjectId）;

其中老师布置作业，老师编辑作业。需要把id给dispatch出去，用来在setTask页面进行SaveTask或者UpdateTask。




