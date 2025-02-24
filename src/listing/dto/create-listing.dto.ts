import { IsEnum, IsUrl } from 'class-validator'
import { OriginWebsite } from 'src/types/originWebsites.enum'
import { UpdateFrecuency } from 'src/types/updateFrecuency.enum'

export class CreateListingDto {
  @IsUrl()
  url: string

  @IsEnum(OriginWebsite)
  website: OriginWebsite

  @IsEnum(UpdateFrecuency)
  updateFrecuency: UpdateFrecuency
}
