using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using space_game.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace space_game.Controllers
{
    [Route("api/[controller]")]
    public class SpaceController : Controller
    {
        HttpClient client = new HttpClient();
        private ILogger _logger;
        
        public SpaceController()
        {
            client.BaseAddress = new Uri("https://findfalcone.herokuapp.com");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            ILoggerFactory _loggerFactory = new LoggerFactory();
            _loggerFactory.AddProvider(new 
            ConsoleLoggerProvider(filter: (text, logLevel) => logLevel >= LogLevel.Information, includeScopes: true));
            _logger = _loggerFactory.CreateLogger(typeof(SpaceController));
        }
        // GET: api/values
        [Route("vehicles")]
        [HttpGet]
        public async Task<IList<Vehicle>> GetVehiclesAsync()
        {
            var response = await client.GetAsync("vehicles");
            List<Vehicle> vehicles = new List<Vehicle>();
            if (response.IsSuccessStatusCode)
            {
                vehicles = await response.Content.ReadAsAsync<List<Vehicle>>();
            }
            return vehicles;
        }

        [Route("planets")]
        [HttpGet]
        public async Task<IList<Planet>> GetPlanetsAsync()
        {
            var response = await client.GetAsync("planets");
            List<Planet> planets = new List<Planet>();
            if (response.IsSuccessStatusCode)
            {
                planets = await response.Content.ReadAsAsync<List<Planet>>();
            }
            return planets;
        }

        // GET api/values/5
        [Route("token")]
        [HttpGet]
        public async Task<TokenResponse> GetTokenAsync()
        {
            var response = await client.PostAsJsonAsync("token", "");
            var token = new TokenResponse();
            if (response.IsSuccessStatusCode)
            {
                token = await response.Content.ReadAsAsync<TokenResponse>();
            }
            return token;
        }

        // POST api/values
        [HttpPost]
        public async Task<Result> PostAsync([FromBody]Search value)
        {
            try
            {
                HttpResponseMessage response = await client.PostAsJsonAsync(
                    "find", value);
                response.EnsureSuccessStatusCode();
                var find = await response.Content.ReadAsAsync<Result>();
                return find;
            }
            catch(Exception ex) {
                _logger.LogCritical(ex, $"Error while finding with token {value.Token}");
                var response = new Result() { Status = false };
                return response;
            }
        }
    }
}
