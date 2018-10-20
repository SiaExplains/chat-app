using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Dtos;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WebApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    
    [Authorize]
    [Route("[controller]")]
    public class MessageController : Controller
    {
        private IMessageService _msgService;
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public MessageController(
            IMessageService msgService,
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _msgService = msgService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _userService = userService;
        }
       // [EnableCors("CorsPolicy")]
        [HttpPost("save")]
        public IActionResult save([FromBody]MessageDto msgDto)
        {

            try
            {
                var userTo = _userService.GetByEmail(msgDto.To);
                var userId = int.Parse(HttpContext.User.Identity.Name);
                var userFrom = _userService.GetById(userId);
                var msg = new Message()
                {
                    ActionDateTime = DateTime.Now,
                    IsReceiverDeleted = false,
                    IsSenderDeleted = false,
                    IsSent = msgDto.ShouldSent,
                    MessageContent = msgDto.Content,
                    Title = msgDto.Title,
                    UserReceiverId = userTo.Id,
                    UserSenderId = userId
                };

                _msgService.Save(msg);

                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _msgService.Delete(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _msgService.GetById(id);
            
            return Ok(user);
        }

        [Route("/inbox")]
        [HttpGet]        
        public IActionResult GetInbox()
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var users = _msgService.GetInbox(userId);
            return Ok(users);
        }

        [Route("/draft")]
        [HttpGet]
        public IActionResult GetDrafts()
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var users = _msgService.GetDrafts(userId);
            return Ok(users);
        }

        [Route("/sent")]
        [HttpGet]
        public IActionResult GetSents()
        {
            var userId = int.Parse(HttpContext.User.Identity.Name);
            var users = _msgService.GetSents(userId);
            return Ok(users);
        }
    }
}
