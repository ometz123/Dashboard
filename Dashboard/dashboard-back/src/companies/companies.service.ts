import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity'
import { Repository } from 'typeorm';


@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const { companyName } = createCompanyDto;
    const company = this.companiesRepository.create({ companyName });
    await this.companiesRepository.save(company)
  }

  findAll() {
    return this.companiesRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} company`;
  // }

  async fetchCompanyById(id: string): Promise<Company> {
    const found = await this.companiesRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Company "${id}" not found`);
    }
    return found;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {

    const hasCompany = await this.fetchCompanyById(id);
    if (!hasCompany) throw new Error(`A company "${id}" was not found`);

    await this.companiesRepository.update(id, updateCompanyDto);

    return this.companiesRepository.findOne({ where: { id } })
  }

  async remove(id: string) {
    const result = await this.companiesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A company "${id}" was not found`);
    }
    return { message: 'Company successfully deleted' };
  }
}
