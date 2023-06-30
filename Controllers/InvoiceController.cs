using AspNetCore.CacheOutput;
using Invoeasy.BLL.CQRS.Commands.Invoice;
using Invoeasy.BLL.CQRS.Queries.Invoice;
using Invoeasy.Definitions.BM;
using Invoeasy.Definitions.DTO;
using Invoeasy.Modules;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Invoeasy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        public IMediator mediator;
        private readonly IApiCacheOutput cache;

        public InvoiceController(IMediator mediator, IApiCacheOutput cache)
        {
            this.mediator = mediator;
            this.cache = cache;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> CreateInvoice([FromBody] InvoiceBM invoice)
        {
            var result = await mediator.Send(new CreateInvoiceCommand(invoice));
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        [InvalidateCacheOutput(nameof(GetInvoiceById))]
        public async Task<ActionResult<bool>> UpdateInvoice([FromRoute] Guid id, [FromBody] InvoiceBM invoice)
        {
            var result = await mediator.Send(new UpdateInvoiceCommand(id, invoice));
            //cache.RemoveAsync()
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        [CacheOutput(ClientTimeSpan = 30, ServerTimeSpan = 60, MustRevalidate = true)]
        public async Task<ActionResult<InvoiceDTO>> GetInvoiceById([FromRoute] Guid id)
        {
            var invoice = await mediator.Send(new GetInvoiceByIdQuery(id));
            return Ok(invoice);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<bool>> DeleteInvoiceById([FromRoute] Guid id)
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<InvoiceDTO>>> GetAllInvoices()
        {
            var list = new List<InvoiceDTO>();
            return Ok(list);
        }

        [HttpGet("grid")]
        public async Task<ActionResult<IEnumerable<InvoiceDTO>>> GetComponents([FromQuery] DataSourceLoadOptions loadOptions)
        {
            var list = new List<InvoiceDTO>();
            return Ok(list);
        }

    }
}
