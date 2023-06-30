using AspNetCore.CacheOutput;
using Invoeasy.BLL.CQRS.Commands.Invoice;
using Invoeasy.BLL.CQRS.Queries.Invoice;
using Invoeasy.Definitions.BM;
using Invoeasy.Definitions.DTO;
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
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceBM invoice)
        {
            await mediator.Send(new CreateInvoiceCommand(invoice));
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        [InvalidateCacheOutput(nameof(GetInvoiceById))]
        public async Task<IActionResult> UpdateInvoice([FromRoute] Guid id, [FromBody] InvoiceBM invoice)
        {
            await mediator.Send(new UpdateInvoiceCommand(id, invoice));
            //cache.RemoveAsync()
            return Ok();
        }

        [HttpGet]
        [Route("{id}")]
        [CacheOutput(ClientTimeSpan = 30, ServerTimeSpan = 60, MustRevalidate = true)]
        public async Task<ActionResult<InvoiceDTO>> GetInvoiceById([FromRoute] Guid id)
        {
            var invoice = await mediator.Send(new GetInvoiceByIdQuery(id));
            return Ok(invoice);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllInvoices()
        {
            return Ok();
        }

    }
}
